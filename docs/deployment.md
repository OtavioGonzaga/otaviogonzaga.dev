# Deployment

Deployment is separate from release creation. The `deploy-release` workflow resolves a published `vX.Y.Z` image to its immutable digest, verifies its Cosign signature and SPDX attestation, then transfers it to a rootless Podman host over SSH.

Configure a GitHub Environment such as `production` with `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, and `DEPLOY_KNOWN_HOSTS` secrets. Set `PORT` and `NEXT_PUBLIC_SITE_URL` as environment variables. A reverse proxy must route public traffic to the loopback-bound container port.

The host keeps the preceding image tagged for rollback. Deploy a prior release again to roll back; never build or deploy a mutable tag on the host.
