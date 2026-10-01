#!/bin/sh
set -eu

environment=${1:?environment required}
app_name=${2:?application name required}
image=${3:?image required}
runtime_env=${4:?runtime environment required}
container_name="$app_name-$environment"
port=$(sed -n 's/^PORT=//p' "$runtime_env")
case "$port" in *[!0-9]*|'') echo 'invalid PORT' >&2; exit 64;; esac

lock_dir="${XDG_RUNTIME_DIR:-/run/user/$(id -u)}/$app_name-locks"
mkdir -p "$lock_dir"
exec flock --exclusive "$lock_dir/$environment.lock" sh -c '
  old_image=""
  if podman container exists "$1"; then old_image=$(podman inspect --format "{{.Image}}" "$1"); fi
  podman rm -f "$1" >/dev/null 2>&1 || true
  if ! podman run -d --name "$1" --restart unless-stopped --read-only --tmpfs /tmp:rw,noexec,nosuid,nodev --env-file "$4" -p "127.0.0.1:$5:$5" "$3" >/dev/null; then
    [ -z "$old_image" ] || podman run -d --name "$1" --restart unless-stopped --read-only --tmpfs /tmp:rw,noexec,nosuid,nodev --env-file "$4" -p "127.0.0.1:$5:$5" "$old_image" >/dev/null
    exit 1
  fi
  attempt=0
  while [ "$attempt" -lt 30 ]; do
    podman exec "$1" bun -e "fetch(\"http://127.0.0.1:$5/healthz\").then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" && exit 0
    attempt=$((attempt + 1)); sleep 1
  done
  podman logs "$1" >&2; exit 1
' sh "$container_name" "$app_name" "$image" "$runtime_env" "$port"
