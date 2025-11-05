const express = require('express');
const router = express.Router();
const { k8sApi } = require('../controllers/kubernetes');

// Get cluster metrics
router.get('/', async (req, res, next) => {
  try {
    const [podsResponse, nodesResponse] = await Promise.all([
      k8sApi.listPodForAllNamespaces(),
      k8sApi.listNode()
    ]);

    const metrics = {
      podCount: podsResponse.body.items.length,
      nodeCount: nodesResponse.body.items.length,
      cpuUsage: 'N/A',
      memoryUsage: 'N/A'
    };

    res.json(metrics);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
