const express = require('express');
const router = express.Router();
const { k8sApi, calculateAge } = require('../controllers/kubernetes');

// Get all pods in a namespace
router.get('/:namespace', async (req, res, next) => {
  try {
    const { namespace } = req.params;
    const response = await k8sApi.listNamespacedPod(namespace);

    const pods = response.body.items.map(pod => ({
      name: pod.metadata.name,
      namespace: pod.metadata.namespace,
      status: pod.status.phase,
      ready: `${pod.status.containerStatuses?.filter(c => c.ready).length || 0}/${pod.spec.containers.length}`,
      restarts: pod.status.containerStatuses?.reduce((sum, c) => sum + c.restartCount, 0) || 0,
      age: calculateAge(pod.metadata.creationTimestamp),
      ip: pod.status.podIP,
      node: pod.spec.nodeName
    }));

    res.json(pods);
  } catch (error) {
    next(error);
  }
});

// Get pod logs
router.get('/:namespace/:name/logs', async (req, res, next) => {
  try {
    const { namespace, name } = req.params;
    const lines = parseInt(req.query.lines) || 100;

    const response = await k8sApi.readNamespacedPodLog(
      name,
      namespace,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      lines
    );

    const logs = response.body.split('\n').map((line, index) => ({
      timestamp: new Date().toISOString(),
      message: line
    }));

    res.json(logs);
  } catch (error) {
    next(error);
  }
});

// Delete a pod
router.delete('/:namespace/:name', async (req, res, next) => {
  try {
    const { namespace, name } = req.params;
    await k8sApi.deleteNamespacedPod(name, namespace);
    res.json({ message: 'Pod deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
