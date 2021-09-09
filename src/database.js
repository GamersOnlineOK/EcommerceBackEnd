const db= require('mongoose');
const URL='mongodb+srv://leonardo:LEOdls123@cluster0.zkuc2.mongodb.net/test';

db.connect(URL)
.then(db=>console.log('conexion con la base de datos exitosa'))
.catch(err=>console.log(err));

module.exports = db;