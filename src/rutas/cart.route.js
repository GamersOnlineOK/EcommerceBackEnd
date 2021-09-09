const express = require('express');
const router = express.Router();
const fs = require("fs");
const { async } = require('regenerator-runtime');
const FILE_PRODUCTOS = "productos.txt";
const prod = require('../models/apicart');

router.get('/', async (req, res) => {

    const ListProd = await prod.find();
    console.log(ListProd);
    res.json(ListProd)
})

// METODOS GET
// ==============LISTAR PRODUCTO===================
router.get('/cart/listar', async (req, res) => {
    const ListProd = await prod.find();
    console.log(ListProd);
    res.json(ListProd)
})
// ==============MOSTRAR PRODUCTO===================
router.get('/cart/listar/:id',async (req, res) => {
    const IdToListOne=req.params.id;
    const oneProducto =await prod.findById(IdToListOne);
    res.json(oneProducto);

})
// METODOS POST
router.post('/cart/guardar', async (req, res) => {
    const { id,timestamp,product } = req.body;
    const producto = new prod({ id,timestamp, product });
    console.log(producto);
    await producto.save();
    res.json({title:"tarea Guardada"})
})

// METODOS PUT
router.put('/cart/actualizar/:id',async (req, res) => {
    const { id,timestamp,product } = req.body;
    const updateProduct={id,title, price, img };
    const idToUpdate= req.params.id;
    await prod.findByIdAndUpdate(idToUpdate,updateProduct);
    res.json(updateProduct);

})

router.delete('/cart/eliminar/:id', async (req, res) => {
    const idToDelete=req.params.id;
    console.log(idToDelete);
    await prod.findByIdAndRemove(idToDelete);
    res.send("Eliminado")

})

module.exports = router;