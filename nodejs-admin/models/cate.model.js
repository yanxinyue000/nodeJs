const mongoose = require('mongoose');
    materializedPlugin = require('mongoose-materialized');


var CateSchema = new mongoose.Schema({ 
    type:Number,
    text:String,
    children:Object
});
CateSchema.plugin(materializedPlugin);

module.exports=mongoose.model('Cate',  CateSchema);
