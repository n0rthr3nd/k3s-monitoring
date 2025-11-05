#!/bin/bash

set -e

echo "========================================"
echo "Building K3S Admin Docker Image"
echo "========================================"

# Variables
IMAGE_NAME="k3s-admin"
IMAGE_TAG="${1:-latest}"
REGISTRY="${2:-localhost:5000}"
FULL_IMAGE="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

echo "Image: ${FULL_IMAGE}"
echo ""

# Build the Docker image
echo "Building Docker image..."
docker build -t ${FULL_IMAGE} -f Dockerfile .

echo ""
echo "========================================"
echo "Build completed successfully!"
echo "Image: ${FULL_IMAGE}"
echo "========================================"
