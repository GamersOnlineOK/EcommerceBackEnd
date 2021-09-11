const express = require('express');
const router = express.Router();
const fs = require("fs");
const { async } = require('regenerator-runtime');
const PRODUCTOS=require('../models/classProduct')
const FILE_PRODUCTOS = "productos.txt";
const prod = require('../models/api');
const admin=false;

//MIDLEWARE

const session=(req,res,next)=>{
    if (admin) {
        console.log("genial");
        next();
        
    } else {
        console.log("usuario no autorizado");
    }
}
router.get('/',session, async (req, res) => {

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
router.post('/productos/guardar',session, async (req, res) => {
    const { id,timestamp, title,description,code,img,price,stock } = req.body;
    const producto = new prod({ id,timestamp, title,description,code,img,price,stock });
    console.log(producto);
    await producto.save();
    let saveproduct = PRODUCTOS.AddProduct(req.body);
    console.log(saveproduct);
    res.json({title:"Producto Guardado"})
})

// METODOS PUT
router.put('/productos/actualizar/:id',session,async (req, res) => {
    const { id, title, price, img } = req.body;
    const updateProduct={id,title, price, img };
    const idToUpdate= req.params.id;
    await prod.findByIdAndUpdate(idToUpdate,updateProduct);
    res.json(updateProduct);

})

router.delete('/productos/eliminar/:id',session, async (req, res) => {
    const idToDelete=req.params.id;
    console.log(idToDelete);
    await prod.findByIdAndRemove(idToDelete);
    
    res.send("Eliminado")

})

module.exports = router;