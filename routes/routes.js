const express = require('express');
const Route = require('../models/Route');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Public GET all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find().populate('usuario', 'username');
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new route (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { origen, destino, horarios = [], paradas = [] } = req.body;
    if (!origen || !destino) {
      return res.status(400).json({ message: 'Origen and destino are required' });
    }
    const newRoute = new Route({
      origen,
      destino,
      horarios,
      paradas,
      usuario: req.user._id,
    });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update route (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    if (route.usuario.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { origen, destino, horarios, paradas } = req.body;
    if (origen !== undefined) route.origen = origen;
    if (destino !== undefined) route.destino = destino;
    if (horarios !== undefined) route.horarios = horarios;
    if (paradas !== undefined) route.paradas = paradas;

    await route.save();
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete route (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    if (route.usuario.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await route.remove();
    res.json({ message: 'Route removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
