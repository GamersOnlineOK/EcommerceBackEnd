const fs = require("fs");
const FILE_PRODUCTOS = "productos.txt";
class Productos {
    listaProductos = [];
    idNuevo = 0;
  
    //Incremental de ID
    AddProduct(array) {
        fs.promises.readFile(FILE_PRODUCTOS).then(data => {

            const json = JSON.parse(data.toString('utf-8'));
            const producto=({...array, id:json.length +1});
            const productoFinal=json.push(producto);
            fs.promises.writeFile(FILE_PRODUCTOS, JSON.stringify(json, null, "\t"))
            .then(() => {
                console.log("Producto Agregado Correctamente");
                
            })
        })
    }
    // Valida productos en array
    listProducto() {
        let parametro = req.params.id;
        fs.promises.readFile('./productos.txt')
            .then(data => data.toString('utf-8'))
            .then(datos => {
                const json = JSON.parse(datos);
                const filter=json.filter(data=>data.id==parametro);
                { filter.length>0 ? (res.json({ filter })) : (res.json({ error: 'producto no encontrado' })) }
    
            })
    }
    // Valida producto existente y retorna producto o error
    leerProductosConId(id) {
      if (this.listaProductos[id - 1] == undefined) {
        return { error: "Ese producto no existe aun" };
      } else {
        return this.listaProductos[id - 1];
      }
    }
    // Actualiza un producto con ID existente
    actualizarConID(id, productoNuevo) {
      let idParsed = parseInt(id);
      let productoAModificar = this.listaProductos.find((obj) => {
        return obj.id == idParsed;
      });
      if (productoAModificar == undefined) {
        return { error: "No existe el producto que desea actualizar" };
      } else {
        productoAModificar.title = productoNuevo.title;
        productoAModificar.price = productoNuevo.price;
        productoAModificar.thumbnail = productoNuevo.thumbnail;
        return productoAModificar;
      }
    }
    // Elimina un producto
    deleteProduct(id) {
        

        fs.promises.readFile(FILE_PRODUCTOS).then(data => {
    
            const json = JSON.parse(data.toString('utf-8'));
            const filter=json.filter(data=>data.id!=id);
            res.send(filter)
            fs.promises.writeFile(FILE_PRODUCTOS, JSON.stringify(filter, null, "\t"))
            .then(() => {
                console.log("Producto Actualizado Correctamente");
            })
        })
    }
  }
  
  // Exporta el modulo Productos
  module.exports = new Productos();