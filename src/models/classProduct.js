const fs = require("fs");
const { update } = require("./api");
const FILE_PRODUCTOS = "productos.txt";
class Productos {
  listaProductos = [];
  idNuevo = 0;

  //Incremental de ID
  saveProduct(array) {
    fs.promises.readFile(FILE_PRODUCTOS).then(data => {

      const json = JSON.parse(data.toString('utf-8'));
      const productoFinal = json.push(array);
      fs.promises.writeFile(FILE_PRODUCTOS, JSON.stringify(json, null, "\t"))
        .then(() => {
          console.log("Producto Agregado Correctamente");

        })
    })
  }
  // Valida productos en array
  async listar(req) {
    let parametro = req.params.id;
    const item = await fs.promises.readFile('./productos.txt')
      .then(data => data.toString('utf-8'))
      .then(datos => {
        const json = JSON.parse(datos);
        const filter = json.filter(data => data.id == parametro);
        if (json.length > 0) {
          console.log(json);
          return json
        } else {
          let error = "producto no encontrado";
          return error;
        }
      })
    return item
  }
  // Valida producto existente y retorna producto o error
  async listarById(parametro) {

    const item = await fs.promises.readFile('./productos.txt')
      .then(data => data.toString('utf-8'))
      .then(datos => {
        const json = JSON.parse(datos);
        const filter = json.filter(data => data.id == parametro);
        if (filter.length > 0) {
          console.log(json);
          return filter
        } else {
          let error = "producto no encontrado";
          return error;
        }
      })
    return item
  }
  // Actualiza un producto con ID existente
  updateById(id, productoNuevo) {
    const update = fs.promises.readFile(FILE_PRODUCTOS).then(data => {

      const json = JSON.parse(data.toString('utf-8'));
      const body = json.findByid
      const indexProduct = json.findIndex((obj) => obj.id == id);
      let prod = json[indexProduct];
     
      prod = productoNuevo;
      
      console.log(prod.stock);
      const producto={
        timestamp:json[indexProduct].timestamp,        
        title: prod.title || json[indexProduct].title,
        description: prod.description || json[indexProduct].description,
        code: prod.code || json[indexProduct].code,
        img: prod.img || json[indexProduct].img,
        price: prod.price ||json[indexProduct].price,
        stock: prod.stock || json[indexProduct].stock,
        id:json[indexProduct].id
      }

      json[indexProduct] = {
        ...producto };

      fs.promises.writeFile(FILE_PRODUCTOS, JSON.stringify(json, null, "\t"))
        .then(() => {
          console.log("Producto Actualizado Correctamente");
        })
      return (json[indexProduct])
    })
    return update;

  }
  // Elimina un producto
  deleteById(id) {


    fs.promises.readFile(FILE_PRODUCTOS).then(data => {

      const json = JSON.parse(data.toString('utf-8'));
      const filter = json.filter(data => data.id != id);
      fs.promises.writeFile(FILE_PRODUCTOS, JSON.stringify(filter, null, "\t"))
        .then(() => {
          console.log("Producto eliminado Correctamente");
        })
    })
  }
}

// Exporta el modulo Productos
module.exports = Productos;