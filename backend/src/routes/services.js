const express = require('express');
const router = express.Router();
const { k8sApi, calculateAge } = require('../controllers/kubernetes');

// Get all services in a namespace
router.get('/:namespace', async (req, res, next) => {
  try {
    const { namespace } = req.params;
    const response = await k8sApi.listNamespacedService(namespace);

    const services = response.body.items.map(service => ({
      name: service.metadata.name,
      namespace: service.metadata.namespace,
      type: service.spec.type,
      clusterIP: service.spec.clusterIP,
      externalIP: service.spec.externalIPs?.join(',') || service.status.loadBalancer?.ingress?.[0]?.ip || 'None',
      ports: service.spec.ports?.map(p => `${p.port}:${p.targetPort}/${p.protocol}`).join(', ') || 'None',
      age: calculateAge(service.metadata.creationTimestamp)
    }));

    res.json(services);
  } catch (error) {
    next(error);
  }
});

// Delete a service
router.delete('/:namespace/:name', async (req, res, next) => {
  try {
    const { namespace, name } = req.params;
    await k8sApi.deleteNamespacedService(name, namespace);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
