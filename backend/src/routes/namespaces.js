const express = require('express');
const router = express.Router();
const { k8sApi, calculateAge } = require('../controllers/kubernetes');

// Get all namespaces
router.get('/', async (req, res, next) => {
  try {
    const response = await k8sApi.listNamespace();

    const namespaces = response.body.items.map(ns => ({
      name: ns.metadata.name,
      status: ns.status.phase,
      age: calculateAge(ns.metadata.creationTimestamp)
    }));

    res.json(namespaces);
  } catch (error) {
    next(error);
  }
});

// Create a namespace
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;

    const namespace = {
      metadata: {
        name: name
      }
    };

    await k8sApi.createNamespace(namespace);
    res.json({ message: 'Namespace created successfully' });
  } catch (error) {
    next(error);
  }
});

// Delete a namespace
router.delete('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    await k8sApi.deleteNamespace(name);
    res.json({ message: 'Namespace deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
