const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const moment=require('moment');

var NewsSchema = new mongoose.Schema({
  cateId: mongoose.Schema.ObjectId,
  title: String,
  content: String,
  date: { type: Date,default:Date.now  } //default: moment().format('LLL'
});
NewsSchema.plugin(mongoosePaginate);

// var News = mongoose.model('News', NewsSchema);
module.exports = mongoose.model('News', NewsSchema);
