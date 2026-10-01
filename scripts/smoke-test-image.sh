#!/bin/sh
set -eu

image=${1:?usage: smoke-test-image.sh IMAGE}
container="portfolio-smoke-$$"
cleanup() { podman rm -f "$container" >/dev/null 2>&1 || true; }
trap cleanup EXIT

podman run -d --name "$container" -p 127.0.0.1::3000 "$image" >/dev/null
port=$(podman port "$container" 3000/tcp | sed 's/.*://')
attempt=0
while [ "$attempt" -lt 30 ]; do
  if curl --fail --silent "http://127.0.0.1:$port/healthz" >/dev/null; then break; fi
  attempt=$((attempt + 1))
  sleep 1
done
[ "$attempt" -lt 30 ] || { podman logs "$container"; exit 1; }
for path in /healthz / /robots.txt /sitemap.xml; do
  curl --fail --silent "http://127.0.0.1:$port$path" >/dev/null
done
