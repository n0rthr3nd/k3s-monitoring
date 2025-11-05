# K3S Admin - Professional Cluster Management Interface

![K3S Admin](https://img.shields.io/badge/K3S-Admin-blue)
![Angular](https://img.shields.io/badge/Angular-19-red)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![License](https://img.shields.io/badge/license-MIT-blue)

A modern, professional, and responsive web application for managing K3S Kubernetes clusters. Built with Angular 19 and Node.js, featuring a beautiful UI design optimized for both desktop and mobile devices.

## Features

### Cluster Management
- **Dashboard Overview**: Real-time cluster metrics and statistics
- **Pod Management**: View, delete, and inspect pod logs
- **Deployment Management**: Scale, restart, and delete deployments
- **Service Management**: Monitor and manage cluster services
- **Namespace Management**: Create and delete namespaces
- **Node Monitoring**: View cluster nodes status and information

### Design & UX
- Professional gradient-based UI design
- Fully responsive (mobile-first approach)
- Modern animations and transitions
- Intuitive navigation with sidebar
- Real-time data updates every 30 seconds
- Clean and accessible interface

### Technical Stack
- **Frontend**: Angular 19 (standalone components)
- **Backend**: Node.js + Express
- **Kubernetes Client**: @kubernetes/client-node
- **Container**: Docker multi-stage build
- **Deployment**: Kubernetes (K3S)

## Prerequisites

- K3S cluster running (or any Kubernetes cluster)
- Docker installed
- kubectl configured
- Local Docker registry (optional, for local development)

## Quick Start

### Option 1: Using the All-in-One Script

The easiest way to build, push, and deploy the application:

```bash
# Setup local registry (if not already running)
docker run -d -p 5000:5000 --restart=always --name registry registry:2

# Build, push, and deploy in one command
./scripts/all.sh latest localhost:5000
```

### Option 2: Step-by-Step Deployment

#### 1. Build the Docker Image

```bash
./scripts/build.sh [TAG] [REGISTRY]

# Example:
./scripts/build.sh latest localhost:5000
```

#### 2. Push to Registry

```bash
./scripts/push.sh [TAG] [REGISTRY]

# Example:
./scripts/push.sh latest localhost:5000
```

#### 3. Deploy to K3S

```bash
./scripts/deploy.sh
```

## Manual Deployment

If you prefer manual deployment:

```bash
# Build the image
docker build -t localhost:5000/k3s-admin:latest .

# Push to registry
docker push localhost:5000/k3s-admin:latest

# Apply Kubernetes manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/rbac.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

# Check deployment status
kubectl rollout status deployment/k3s-admin -n k3s-admin
```

## Accessing the Application

After deployment, you can access the application through:

### NodePort (default)
```
http://<node-ip>:30080
```

### Ingress (with DNS setup)
Add to `/etc/hosts`:
```
<node-ip> k3s-admin.local
```

Then access:
```
http://k3s-admin.local
```

## Development

### Frontend Development

```bash
cd frontend
npm install
npm start

# The app will be available at http://localhost:4200
```

### Backend Development

```bash
cd backend
npm install
npm run dev

# The API will be available at http://localhost:3000
```

## Project Structure

```
k3s-monitoring/
├── frontend/                # Angular 19 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # UI components
│   │   │   ├── services/    # API services
│   │   │   ├── models/      # TypeScript models
│   │   │   └── interceptors/# HTTP interceptors
│   │   ├── styles/          # Global styles
│   │   └── environments/    # Environment configs
│   ├── angular.json
│   └── package.json
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   └── server.js        # Entry point
│   └── package.json
├── k8s/                     # Kubernetes manifests
│   ├── namespace.yaml
│   ├── rbac.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── scripts/                 # Deployment scripts
│   ├── build.sh
│   ├── push.sh
│   ├── deploy.sh
│   └── all.sh
├── Dockerfile               # Multi-stage build
└── README.md
```

## API Endpoints

### Pods
- `GET /api/pods/:namespace` - List pods in namespace
- `GET /api/pods/:namespace/:name/logs` - Get pod logs
- `DELETE /api/pods/:namespace/:name` - Delete pod

### Deployments
- `GET /api/deployments/:namespace` - List deployments
- `PATCH /api/deployments/:namespace/:name/scale` - Scale deployment
- `POST /api/deployments/:namespace/:name/restart` - Restart deployment
- `DELETE /api/deployments/:namespace/:name` - Delete deployment

### Services
- `GET /api/services/:namespace` - List services
- `DELETE /api/services/:namespace/:name` - Delete service

### Namespaces
- `GET /api/namespaces` - List namespaces
- `POST /api/namespaces` - Create namespace
- `DELETE /api/namespaces/:name` - Delete namespace

### Nodes
- `GET /api/nodes` - List nodes

### Metrics
- `GET /api/metrics` - Get cluster metrics

## RBAC Permissions

The application requires the following Kubernetes permissions:

- **Pods**: get, list, watch, delete
- **Deployments**: get, list, watch, update, patch, delete
- **Services**: get, list, watch, delete
- **Namespaces**: get, list, watch, create, delete
- **Nodes**: get, list, watch

## Customization

### Changing the Registry

Edit the `REGISTRY` variable in scripts or deployment:

```bash
./scripts/all.sh latest your-registry.com:5000
```

Update the image in `k8s/deployment.yaml`:
```yaml
image: your-registry.com:5000/k3s-admin:latest
```

### Changing the NodePort

Edit `k8s/service.yaml`:
```yaml
nodePort: 30080  # Change to your preferred port
```

### Adding Custom Ingress

Edit `k8s/ingress.yaml` to match your ingress controller and domain.

## Troubleshooting

### Check Pod Status
```bash
kubectl get pods -n k3s-admin
```

### View Logs
```bash
kubectl logs -f deployment/k3s-admin -n k3s-admin
```

### Check Service
```bash
kubectl get svc -n k3s-admin
```

### Describe Deployment
```bash
kubectl describe deployment k3s-admin -n k3s-admin
```

### Permission Issues
Ensure RBAC is properly configured:
```bash
kubectl get serviceaccount k3s-admin -n k3s-admin
kubectl get clusterrole k3s-admin
kubectl get clusterrolebinding k3s-admin
```

## Security Considerations

- The application runs as non-root user (UID 1001)
- RBAC permissions are scoped to necessary operations only
- Security contexts applied to pods
- Helmet.js for HTTP security headers
- CORS enabled for API access

## Performance

- Multi-stage Docker build for optimized image size
- Production build of Angular with optimization
- Compression enabled on API responses
- Resource limits configured in Kubernetes

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue in the GitHub repository.

---

Made with ❤️ for the Kubernetes community
