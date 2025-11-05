#!/bin/bash

set -e

echo "========================================"
echo "Pushing K3S Admin to Registry"
echo "========================================"

# Variables
IMAGE_NAME="k3s-admin"
IMAGE_TAG="${1:-latest}"
REGISTRY="${2:-localhost:5000}"
FULL_IMAGE="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

echo "Image: ${FULL_IMAGE}"
echo ""

# Push the Docker image
echo "Pushing Docker image to registry..."
docker push ${FULL_IMAGE}

echo ""
echo "========================================"
echo "Push completed successfully!"
echo "Image: ${FULL_IMAGE}"
echo "========================================"
