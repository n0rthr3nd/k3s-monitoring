#!/bin/bash

set -e

echo "========================================"
echo "Deploying K3S Admin to K3S Cluster"
echo "========================================"

# Variables
NAMESPACE="k3s-admin"

echo "Namespace: ${NAMESPACE}"
echo ""

# Apply Kubernetes manifests
echo "Creating namespace..."
kubectl apply -f k8s/namespace.yaml

echo "Creating RBAC resources..."
kubectl apply -f k8s/rbac.yaml

echo "Creating deployment..."
kubectl apply -f k8s/deployment.yaml

echo "Creating service..."
kubectl apply -f k8s/service.yaml

echo "Creating ingress..."
kubectl apply -f k8s/ingress.yaml

echo ""
echo "Waiting for deployment to be ready..."
kubectl rollout status deployment/k3s-admin -n ${NAMESPACE} --timeout=300s

echo ""
echo "========================================"
echo "Deployment completed successfully!"
echo "========================================"
echo ""
echo "Access the application:"
echo "  - NodePort: http://<node-ip>:30080"
echo "  - Ingress:  http://k3s-admin.local (add to /etc/hosts)"
echo ""
echo "Check deployment status:"
echo "  kubectl get all -n ${NAMESPACE}"
echo ""
echo "View logs:"
echo "  kubectl logs -f deployment/k3s-admin -n ${NAMESPACE}"
echo "========================================"
