const faker=require('faker');

faker.locale="es";
exports.userFakers=()=>({
    nombre:faker.commerce.productName(),
    precio:faker.commerce.price(),
    foto:faker.image.image()

})
