const express = require('express');
const router = express.Router();
const fs = require("fs");
const { async } = require('regenerator-runtime');
const FILE_PRODUCTOS = "productos.txt";
const prod = require('../models/api');

router.get('/', async (req, res) => {

    const ListProd = await prod.find();
    console.log(ListProd);
    res.json(ListProd)


})

// METODOS GET
// ==============LISTAR PRODUCTO===================
router.get('/productos/listar', async (req, res) => {
    const ListProd = await prod.find();
    console.log(ListProd);
    res.json(ListProd)
})
// ==============MOSTRAR PRODUCTO===================
router.get('/productos/listar/:id',async (req, res) => {
    const IdToListOne=req.params.id;
    const oneProducto =await prod.findById(IdToListOne);
    res.json(oneProducto);

})
// METODOS POST
router.post('/productos/guardar', async (req, res) => {
    const { id,timestamp, title,description,code,img,price,stock } = req.body;
    const producto = new prod({ id,timestamp, title,description,code,img,price,stock });
    console.log(producto);
    await producto.save();
    res.json({title:"tarea Guardada"})
})

// METODOS PUT
router.put('/productos/actualizar/:id',async (req, res) => {
    const { id, title, price, img } = req.body;
    const updateProduct={id,title, price, img };
    const idToUpdate= req.params.id;
    await prod.findByIdAndUpdate(idToUpdate,updateProduct);
    res.json(updateProduct);

})

router.delete('/productos/eliminar/:id', async (req, res) => {
    const idToDelete=req.params.id;
    console.log(idToDelete);
    await prod.findByIdAndRemove(idToDelete);
    res.send("Eliminado")

})

module.exports = router;