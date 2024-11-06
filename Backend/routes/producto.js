const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');


router.post('/', productoController.crearProducto)

router.get('/', productoController.obtenerProductos)

router.delete('/:id', productoController.eliminarProducto)

router.put('/:id', productoController.actualizarProducto)

router.get('/:id', productoController.obtenerProducto); //Obtener un solo producto


module.exports = router