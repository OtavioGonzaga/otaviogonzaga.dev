#!/bin/sh
set -eu

output=${1:?usage: create-runtime-env.sh OUTPUT}
: "${PORT:?PORT is required}"
: "${NEXT_PUBLIC_SITE_URL:?NEXT_PUBLIC_SITE_URL is required}"
case "$PORT" in *[!0-9]*|'') exit 64;; esac
case "$NEXT_PUBLIC_SITE_URL" in https://*) ;; *) echo 'NEXT_PUBLIC_SITE_URL must use HTTPS' >&2; exit 64;; esac
umask 077
{
  printf 'PORT=%s\n' "$PORT"
  printf 'NEXT_PUBLIC_SITE_URL=%s\n' "$NEXT_PUBLIC_SITE_URL"
} > "$output"
