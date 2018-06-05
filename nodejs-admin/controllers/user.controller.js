const mongoose = require('mongoose');
const User = require('../models/user.model');

// post
exports.create = function(req, res, next) {
  const user = new User(req.body);
  user.save().then(data => {
    res.json(data);
  });
};

// update
exports.update = function(req, res, next) {
  const id = req.params.id; // req.query req.body req.params

  User.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
    res.json(data); // 特别强调，在更新阶段，这个data是上一次没有更新完成的数据，而不是已经更新完成的数据
  });
};

// delete
exports.delete = function(req, res, next) {
  const id = req.params.id; // req.query req.body req.params

  User.findByIdAndRemove(id, function(err, doc) {
    res.json({ status: 200, message: '数据删除成功' });
  });
};

// get
exports.get = function(req, res, next) {
  const id = req.params.id; // req.query req.body req.params

  User.findById(id, function(err, result) {
    res.json(result);
  });
};

// get
exports.removes = function(req, res, next) {
  const ids = req.body.ids.split(',');

  if (ids.length > 0) {
    User.remove({ _id: { $in: ids } }).then(data => {
      res.json({ status: 200, message: '删除多条数据成功' });
    });
  }
};

// list
exports.list = function (req,res,next) {
  var page = req.body.page ? req.body.page : 1;
  var limit = req.body.limit ? req.body.limit : 5;
  var quertCondition = {};
  if(req.body.name && req.body.name.trim().length > 0){
    quertCondition={
      name : new RegExp(req.body.name,'i')
    }
  }
  User.paginate(quertCondition, { page: +page, limit: +limit }, function(err, result) {
    result.rows=result.docs;
    delete result.docs;
    res.json(result);
  });
};