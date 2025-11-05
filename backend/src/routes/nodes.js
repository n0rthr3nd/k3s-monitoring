const express = require('express');
const router = express.Router();
const { k8sApi, calculateAge } = require('../controllers/kubernetes');

// Get all nodes
router.get('/', async (req, res, next) => {
  try {
    const response = await k8sApi.listNode();

    const nodes = response.body.items.map(node => ({
      name: node.metadata.name,
      status: node.status.conditions?.find(c => c.type === 'Ready')?.status === 'True' ? 'Ready' : 'NotReady',
      roles: node.metadata.labels?.['node-role.kubernetes.io/master'] ? 'master' :
             node.metadata.labels?.['node-role.kubernetes.io/control-plane'] ? 'control-plane' : 'worker',
      age: calculateAge(node.metadata.creationTimestamp),
      version: node.status.nodeInfo.kubeletVersion
    }));

    res.json(nodes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
