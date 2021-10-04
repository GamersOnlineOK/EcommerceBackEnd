const prod = require('../models/api');
class mongo {
    listar(req) {
        const ListProd = prod.find();
        return ListProd;
    }
    listarById(IdToListOne) {
        const oneProducto = prod.findById(IdToListOne);
        return oneProducto;
    }
    saveProduct(producto){
        console.log("entro");
        const item=producto.save();
        return item; 
    }
    updateById(idToUpdate, updateProduct){
        const item=prod.findByIdAndUpdate(idToUpdate, updateProduct);
        return item;
    }
    deleteById(idToDelete){
        const item=prod.findByIdAndRemove(idToDelete);
        return item;
    }

}
module.exports = mongo;