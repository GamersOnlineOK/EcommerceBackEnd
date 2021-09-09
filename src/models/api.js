const db=require('mongoose');
const {Schema}=db;

const SchemaProduct=new Schema({
    timestamp:{type:Number,require:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    code:{type:String,require:true},
    img:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,require:true}
    
});
module.exports=db.model('productos',SchemaProduct);