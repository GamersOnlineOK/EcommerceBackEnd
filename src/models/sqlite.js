const { options } = require("../sqlite/conection");
const knex = require('knex')(options);

class Sqlite {
    async listar(req) {
        try {
            const ListProd = await knex.from('producto').select("*");
            console.log(ListProd);
            return ListProd;
        } catch (error) {
            console.log(error);
        }
    }
    async listarById(IdToListOne) {
        try {
            const ListProd = await knex.from('producto').where('id', IdToListOne)
                .then(() => console.log("trajo todo"))
                .catch((err) => { console.log(err); throw err })
                .finally(() => { knex.destroy(); });
            console.log(ListProd);
            return ListProd;
        } catch (error) {
            console.log(error);
        }
    }
    async saveProduct(producto) {
        console.log("entro");
        console.log(producto);
        const item = await knex('producto').insert(producto)
            .then(() => console.log("producto insertado"))
            .catch((err) => { console.log(err); throw err })
            .finally(() => { knex.destroy(); })
        return item;
    }
    async updateById(idToUpdate, updateProduct) {
        
        try {
            const ListProd = await knex.from('producto').where('id', idToUpdate).update(updateProduct)
                .then(() => console.log("Producto Actualizado"))
                .catch((err) => { console.log(err); throw err })
                .finally(() => { knex.destroy(); });
            console.log(ListProd);
            return ListProd;
        } catch (error) {
            console.log(error);
        }
    }
    deleteById(idToDelete) {
        const item = prod.findByIdAndRemove(idToDelete);
        return item;
    }

}
module.exports = Sqlite;