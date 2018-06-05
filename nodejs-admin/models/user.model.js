const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  city: String,
  date: { type: Date },
  gender: String,
  interest: [],
  desc: String,
  age: Number
});
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
