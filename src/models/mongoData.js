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
    globalFilter(obj){
        const name=obj.name;
        const code=obj.code;
        const pricemin=obj.pricemin;
        const pricemax=obj.pricemax;
        const stockmin=obj.stockmin;
        const stockmax=obj.stockmax;

        
        const query=prod.find({$or:[
            {$or:[{title:name},{code:code}]},
            {price:{$in:[pricemin,pricemax]}},
            {stock:{$in:[stockmin,stockmax]}}
        ]})
        return query
    }

}
module.exports = mongo;