const express = require('express');
const router = express.Router();
const fs = require("fs");
const { userFakers } = require('../generadores/userFaker');
const { async } = require('regenerator-runtime');
const FILE_PRODUCTOS = "productos.txt";
const prod = require('../models/api');
const { options } = require('../sqlite/conection')
const knex = require('knex')(options);
const Productos = require('../models/classProduct')
const MongoDB = require('../models/mongoData');
const Sqlite = require('../models/sqlite');
const admin = true;

const DATA = 3;
let db = 0;
switch (DATA) {
    case 1:
        db = new MongoDB();
        break;
    case 2:
        db = new Productos();
        break;
    case 3:
        db = new Sqlite();
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

    await knex.schema.dropTableIfExists('producto')
        .createTable('producto',
            table => {
                table.string('$__')
                table.string('$errors')
                table.string('$isNew')
                table.string('$locals')
                table.string('$op')
                table.string('_doc')
                table.string('timestamp')
                table.string('title')
                table.string('description')
                table.string('code')
                table.string('img')
                table.integer('price')
                table.integer('stock')
                table.string('_id')


            }).then(() => console.log("se creo la tabla"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => { knex.destroy(); })
    next();
}
router.get('/', session, async (req, res) => {

    const ListProd = await db.listar(req);
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
router.post('/productos/guardar', session,createTable, async (req, res) => {


    const { id, timestamp, title, description, code, img, price, stock } = req.body;
    const producto = new prod({ id, timestamp, title, description, code, img, price, stock });

    const item = await db.saveProduct(producto);

    res.json({ title: item })
})

// METODOS PUT
router.put('/productos/actualizar/:id', session, async (req, res) => {
    const { title, description, code, img, price, stock } = req.query;
    console.log(req.query);
    const updateProduct = { title, description, code, img, price, stock };
    console.log(updateProduct);
    const idToUpdate = req.params.id;
    console.log(idToUpdate);
    const item = await db.updateById(idToUpdate, updateProduct);
    res.json(item);

})

router.delete('/productos/eliminar/:id', session, async (req, res) => {
    const idToDelete = req.params.id;
    console.log(idToDelete);
    const item = await db.deleteById(idToDelete);
    res.send("Producto Eliminado")

})
// METODO FILTER
router.get('/productos/filtrar', async (req, res) => {
    const { name, code, pricemin, pricemax, stockmin, stockmax } = req.query;
    const request = { name: name, code: code, pricemin: pricemin, pricemax: pricemax, stockmin: stockmin, stockmax: stockmax };

    const filter = await db.globalFilter(request);
    res.send(filter);
})

// MOTODO FAKERS
router.get('/productos/vista-test/:cant?', (req, res) => {
    console.log("cantidad=" + req.params.cant);
    let cant = req.params.cant || 10;

    user = [];
    if (cant <= 0) {
        user = { error: "no hay productos" }
    } else {
        for (let index = 0; index < cant; index++) {
            let usuario = userFakers();
            user.push(usuario);

        }
    }

    res.send(user);
})

module.exports = router;