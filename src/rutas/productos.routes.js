const express = require('express');
const router = express.Router();
const fs = require("fs");
const { async } = require('regenerator-runtime');
const Productos = require('../models/classProduct')
const FILE_PRODUCTOS = "productos.txt";
const prod = require('../models/api');
const { options } = require('../option/conection')
const knex = require('knex')(options);
const MongoDB = require('../models/mongoData');
const admin = true;

const DATA = 2;
let db = 0;
switch (DATA) {
    case 1:
        db = new MongoDB();
        break;
    case 2:
        db = new Productos();
        break;
    default:
        break;
}

//MIDLEWARE

const session = (req, res, next) => {
    if (admin) {
        console.log("genial");
        next();

    } else {
        console.log("usuario no autorizado");
    }
}
const createTable = async (req, res, next) => {
    await knex.schema.dropTableIfExists('productos')
        .createTable('productos',
            table => {
                table.increments('id').notNullable()
                table.string('nombre');
                console.log("se creo la tabla");
            })
    next();
}
router.get('/', session, async (req, res) => {

    const ListProd = await prod.find();
    console.log(ListProd);
    res.json(ListProd)


})


// METODOS GET
// ==============LISTAR PRODUCTO===================
router.get('/productos/listar', async (req, res) => {
    let response = await db.listar(req);
    res.json(response)
})
// ==============MOSTRAR PRODUCTO===================
router.get('/productos/listar/:id', async (req, res) => {
    const IdToListOne = req.params.id;
    const oneProducto = await db.listarById(IdToListOne);
    res.json(oneProducto);

})
// METODOS POST
router.post('/productos/guardar',session, async (req, res) => {


    const { id, timestamp, title, description, code, img, price, stock } = req.body;
    const producto = new prod({ id, timestamp, title, description, code, img, price, stock });
    
    const item=await db.saveProduct(producto);
   
    res.json({ title: item})
})

// METODOS PUT
router.put('/productos/actualizar/:id',session, async (req, res) => {
    const { id, title, price, img } =await req.body;
    console.log(req.body);
    const updateProduct = { id, title, price, img };
    console.log(updateProduct);
    const idToUpdate = req.params.id;
    console.log(idToUpdate);
    const item= await db.updateById(idToUpdate, updateProduct);
    res.json(item);

})

router.delete('/productos/eliminar/:id', session, async (req, res) => {
    const idToDelete = req.params.id;
    console.log(idToDelete);
    const item= await db.deleteById(idToDelete);
    res.send("Producto Eliminado")

})

module.exports = router;