const express = require('express');
const router = express.Router();
const { k8sAppsApi, calculateAge } = require('../controllers/kubernetes');

// Get all deployments in a namespace
router.get('/:namespace', async (req, res, next) => {
  try {
    const { namespace } = req.params;
    const response = await k8sAppsApi.listNamespacedDeployment(namespace);

    const deployments = response.body.items.map(deployment => ({
      name: deployment.metadata.name,
      namespace: deployment.metadata.namespace,
      ready: `${deployment.status.readyReplicas || 0}/${deployment.spec.replicas || 0}`,
      upToDate: deployment.status.updatedReplicas || 0,
      available: deployment.status.availableReplicas || 0,
      age: calculateAge(deployment.metadata.creationTimestamp),
      replicas: deployment.spec.replicas || 0
    }));

    res.json(deployments);
  } catch (error) {
    next(error);
  }
});

// Scale a deployment
router.patch('/:namespace/:name/scale', async (req, res, next) => {
  try {
    const { namespace, name } = req.params;
    const { replicas } = req.body;

    const deployment = await k8sAppsApi.readNamespacedDeployment(name, namespace);
    deployment.body.spec.replicas = parseInt(replicas);

    await k8sAppsApi.replaceNamespacedDeployment(name, namespace, deployment.body);
    res.json({ message: 'Deployment scaled successfully' });
  } catch (error) {
    next(error);
  }
});

// Restart a deployment
router.post('/:namespace/:name/restart', async (req, res, next) => {
  try {
    const { namespace, name } = req.params;

    const deployment = await k8sAppsApi.readNamespacedDeployment(name, namespace);

    if (!deployment.body.spec.template.metadata.annotations) {
      deployment.body.spec.template.metadata.annotations = {};
    }

    deployment.body.spec.template.metadata.annotations['kubectl.kubernetes.io/restartedAt'] = new Date().toISOString();

    await k8sAppsApi.replaceNamespacedDeployment(name, namespace, deployment.body);
    res.json({ message: 'Deployment restarted successfully' });
  } catch (error) {
    next(error);
  }
});

// Delete a deployment
router.delete('/:namespace/:name', async (req, res, next) => {
  try {
    const { namespace, name } = req.params;
    await k8sAppsApi.deleteNamespacedDeployment(name, namespace);
    res.json({ message: 'Deployment deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
