export interface Pod {
  name: string;
  namespace: string;
  status: string;
  ready: string;
  restarts: number;
  age: string;
  ip?: string;
  node?: string;
}

export interface Deployment {
  name: string;
  namespace: string;
  ready: string;
  upToDate: number;
  available: number;
  age: string;
  replicas: number;
}

export interface Service {
  name: string;
  namespace: string;
  type: string;
  clusterIP: string;
  externalIP: string;
  ports: string;
  age: string;
}

export interface Namespace {
  name: string;
  status: string;
  age: string;
}

export interface Node {
  name: string;
  status: string;
  roles: string;
  age: string;
  version: string;
}

export interface ResourceMetrics {
  cpuUsage: string;
  memoryUsage: string;
  podCount: number;
  nodeCount: number;
}

export interface LogEntry {
  timestamp: string;
  message: string;
}
