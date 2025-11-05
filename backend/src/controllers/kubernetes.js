const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();

// Try to load from cluster first (when running in K8s), fallback to default config
try {
  kc.loadFromCluster();
  console.log('Loaded Kubernetes config from cluster');
} catch (e) {
  try {
    kc.loadFromDefault();
    console.log('Loaded Kubernetes config from default');
  } catch (err) {
    console.error('Failed to load Kubernetes config:', err.message);
  }
}

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api);

// Helper function to calculate age
function calculateAge(creationTimestamp) {
  const created = new Date(creationTimestamp);
  const now = new Date();
  const diffMs = now - created;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) return `${diffDays}d`;
  if (diffHours > 0) return `${diffHours}h`;
  if (diffMinutes > 0) return `${diffMinutes}m`;
  return '1m';
}

module.exports = {
  k8sApi,
  k8sAppsApi,
  calculateAge
};
