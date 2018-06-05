const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var CommentSchema = new mongoose.Schema({
  cateId: mongoose.Schema.ObjectId,
  username: String,
  content: String,
  date: { type: Date, default: Date.now }
});
CommentSchema.plugin(mongoosePaginate);

// var News = mongoose.model('News', NewsSchema);
module.exports = mongoose.model('Comments', CommentSchema);
