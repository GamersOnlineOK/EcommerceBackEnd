const express = require('express');
const router = express.Router();
const fs = require("fs");
const { nextTick } = require('process');
const { async } = require('regenerator-runtime');
const FILE_PRODUCTOS = "productos.txt";
const cart = require('../models/apicart');
const prod=require('../models/api')

router.get('/', async (req, res) => {

    const ListProd = await cart.find();
    console.log(ListProd);
    res.json(ListProd)
})


// METODOS GET
// ==============LISTAR PRODUCTO===================
router.get('/cart/listar', async (req, res) => {
    const ListProd = await cart.find();
    console.log(ListProd);
    res.json(ListProd)
})
// ==============MOSTRAR PRODUCTO===================
router.get('/cart/listar/:id',async (req, res) => {
    const IdToListOne=req.params.id;
    const oneProducto =await cart.findById(IdToListOne);
    res.json(oneProducto);

})
// METODOS POST
router.post('/cart/guardar', async (req, res) => {
    
    const oneProduct =await prod.findById(req.body.id);    
    const { id,timestamp } = req.body;
    const producto = new cart({ id,timestamp, product:oneProduct });
    console.log(producto);
    await producto.save();
    res.json({title:"Carrito enviado"})
})

// METODOS PUT
router.put('/cart/actualizar/:id',async (req, res) => {
    const { id,timestamp,product } = req.body;
    const updateProduct={id,title, price, img };
    const idToUpdate= req.params.id;
    await cart.findByIdAndUpdate(idToUpdate,updateProduct);
    res.json(updateProduct);

})

router.delete('/cart/eliminar/:id', async (req, res) => {
    const idToDelete=req.params.id;
    console.log(idToDelete);
    await cart.findByIdAndRemove(idToDelete);
    res.send("Eliminado")

})

module.exports = router;