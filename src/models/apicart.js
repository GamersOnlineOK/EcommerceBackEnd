const db=require('mongoose');
const {Schema}=db;

const SchemaProduct=new Schema({
    timestamp:{type:Number,require:true},
    product:{type:Array}
    
});
module.exports=db.model('cart',SchemaProduct);