# Deployment

Deployment is separate from release creation. The `deploy-release` workflow resolves a published `vX.Y.Z` image to its immutable digest and annotated release commit, checks that the OCI revision label matches that commit, verifies its Cosign signature and SPDX attestation, then transfers it to a rootless Podman host over SSH. The deployment job checks out that same release commit, so local actions and deployment scripts are versioned with the release.

Configure a GitHub Environment such as `production` with `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, and `DEPLOY_KNOWN_HOSTS` secrets. Set `PORT` and `NEXT_PUBLIC_SITE_URL` as environment variables. A reverse proxy must route public traffic to the loopback-bound container port.

The host validates a candidate container before replacing the active one. When an active container exists, its image is retained as `<app>-<environment>:previous`; if the promoted container cannot start or fails readiness, that preceding image is restored and must also pass readiness. Deploy a prior release again to perform an intentional rollback; never build or deploy a mutable tag on the host.
