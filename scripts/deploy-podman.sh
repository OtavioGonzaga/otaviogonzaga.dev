#!/bin/sh
set -eu

environment=${1:?environment required}
app_name=${2:?application name required}
image=${3:?image required}
runtime_env=${4:?runtime environment required}
container_name="$app_name-$environment"
port=$(sed -n 's/^PORT=//p' "$runtime_env")
case "$port" in *[!0-9]*|'') echo 'invalid PORT' >&2; exit 64;; esac
health_attempts=${DEPLOY_HEALTH_ATTEMPTS:-30}
health_interval=${DEPLOY_HEALTH_INTERVAL:-1}
case "$health_attempts" in *[!0-9]*|'') echo 'invalid DEPLOY_HEALTH_ATTEMPTS' >&2; exit 64;; esac
case "$health_interval" in *[!0-9]*|'') echo 'invalid DEPLOY_HEALTH_INTERVAL' >&2; exit 64;; esac

lock_dir="${XDG_RUNTIME_DIR:-/run/user/$(id -u)}/$app_name-locks"
mkdir -p "$lock_dir"

if [ "${5:-}" = "--locked" ]; then
  previous_image="$app_name-$environment:previous"
  candidate_name="$container_name-candidate"
  old_image=""

  run_container() {
    name=$1
    image_ref=$2
    publish_port=${3:-}
    if [ -n "$publish_port" ]; then
      podman run -d --name "$name" --restart unless-stopped --read-only --tmpfs /tmp:rw,noexec,nosuid,nodev --env-file "$runtime_env" -p "127.0.0.1:$port:$port" "$image_ref" >/dev/null
    else
      podman run -d --name "$name" --restart unless-stopped --read-only --tmpfs /tmp:rw,noexec,nosuid,nodev --env-file "$runtime_env" "$image_ref" >/dev/null
    fi
  }

  wait_for_health() {
    name=$1
    attempt=0
    while [ "$attempt" -lt "$health_attempts" ]; do
      podman exec "$name" bun -e "fetch(\"http://127.0.0.1:$port/healthz\").then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" && return 0
      attempt=$((attempt + 1))
      sleep "$health_interval"
    done
    return 1
  }

  restore_previous() {
    podman rm -f "$container_name" >/dev/null 2>&1 || true
    [ -z "$old_image" ] && return 0
    podman tag "$old_image" "$previous_image"
    run_container "$container_name" "$previous_image" published
  }

  if podman container exists "$container_name"; then
    old_image=$(podman inspect --format "{{.Image}}" "$container_name")
    podman tag "$old_image" "$previous_image"
  fi

  podman rm -f "$candidate_name" >/dev/null 2>&1 || true
  if ! run_container "$candidate_name" "$image"; then
    exit 1
  fi
  if ! wait_for_health "$candidate_name"; then
    podman logs "$candidate_name" >&2 || true
    podman rm -f "$candidate_name" >/dev/null 2>&1 || true
    exit 1
  fi
  podman rm -f "$candidate_name" >/dev/null 2>&1 || true

  podman rm -f "$container_name" >/dev/null 2>&1 || true
  if ! run_container "$container_name" "$image" published || ! wait_for_health "$container_name"; then
    podman logs "$container_name" >&2 || true
    restore_previous
    exit 1
  fi
  exit 0
fi

exec flock --exclusive "$lock_dir/$environment.lock" "$0" "$environment" "$app_name" "$image" "$runtime_env" --locked
