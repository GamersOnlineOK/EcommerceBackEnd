const express = require('express');
const router = express.Router();
const fs = require("fs");
const { async } = require('regenerator-runtime');
const PRODUCTOS=require('../models/classProduct')
const FILE_PRODUCTOS = "productos.txt";
const prod = require('../models/api');
const {options}=require('../option/conection')
const knex=require('knex')(options);
const admin=true;

//MIDLEWARE

const session=(req,res,next)=>{
    if (admin) {
        console.log("genial");
        next();
        
    } else {
        console.log("usuario no autorizado");
    }
}
const createTable=async (req,res,next)=>{
    await knex.schema.dropTableIfExists('productos')
    .createTable('productos',
    table=>{
        table.increments('id').notNullable()
        table.string('nombre');
        console.log("se creo la tabla");
    })
    next();
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
    // kenx
    knex.from('productos').select("*")
    .then((data)=>{
        console.log(data);
    })
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
router.post('/productos/guardar',createTable, async (req, res) => {
    
    
    const { id,timestamp, title,description,code,img,price,stock } = req.body;
    const producto = new prod({ id,timestamp, title,description,code,img,price,stock });
    console.log(producto);
    await producto.save();
    let saveproduct = PRODUCTOS.AddProduct(req.body);
   
    console.log(productos);
    res.json({title:productos})
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