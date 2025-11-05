#!/bin/bash

set -e

echo "========================================"
echo "K3S Admin - Build, Push & Deploy"
echo "========================================"

# Variables
IMAGE_TAG="${1:-latest}"
REGISTRY="${2:-localhost:5000}"

# Build
echo ""
echo "Step 1/3: Building Docker image..."
./scripts/build.sh ${IMAGE_TAG} ${REGISTRY}

# Push
echo ""
echo "Step 2/3: Pushing to registry..."
./scripts/push.sh ${IMAGE_TAG} ${REGISTRY}

# Deploy
echo ""
echo "Step 3/3: Deploying to K3S..."
./scripts/deploy.sh

echo ""
echo "========================================"
echo "All steps completed successfully!"
echo "========================================"
