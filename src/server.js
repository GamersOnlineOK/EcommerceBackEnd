const express=require('express');
const morgan=require('morgan');
const {db}=require('./database');
const app=express();
const path=require('path');

// Configuracion gral
app.set('port', process.env.PORT || 3000);
// Middlewares
app.use(morgan('dev'));
app.use(express.json());
// Rutas
const productos = require('./rutas/productos.routes');
const cart=require('./rutas/cart.route');
app.use('/api',productos);
app.use('/api',cart)
// Archivos estaticos
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
// server
app.listen(app.get('port'), ()=>{
    console.log("servidor corriendo ");
})