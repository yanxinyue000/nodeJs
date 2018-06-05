const mongoose = require('mongoose');
const Comment = require('../models/comment.model');

// post
exports.create = function(req, res, next) {
  const comment = new Comment(req.body);
  comment.save().then(data => {
    res.json(data);
  });
};

// update
exports.update = function(req, res, next) {
  const id = req.params.id; // req.query req.body req.params

  Comment.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
    res.json(data); // 特别强调，在更新阶段，这个data是上一次没有更新完成的数据，而不是已经更新完成的数据
  });
};

exports.find = function(req, res, next) {
  const id = req.params.id; // req.query req.body req.params

  Comment.findById(id, function(err, result) {
    res.json(result);
  });
};

exports.get = function(req, res, next) {
  const id = req.params.id; // req.query req.body req.params
  Comment.count({cateId:id}, function(err, result) {
    res.json(result);
  });
};
// delete
exports.delete = function(req, res, next) {
  var id = req.params.id; // req.query req.body req.params
  Comment.findByIdAndRemove(id, function(err, doc) {
    res.json({ status: 200, message: '数据删除成功' });
  });
};

exports.removes = function(req, res, next) {
  const ids = req.body.ids.split(',');

  if (ids.length > 0) {
    Comment.remove({ _id: { $in: ids } }).then(data => {
      res.json({ status: 200, message: '删除多条数据成功' });
    });
  }
};

exports.list = function(req, res, next) {
  const page = req.body.page ? req.body.page : 1;
  const rows = req.body.rows ? req.body.rows : 5;
  var queryCondition = {};

  // 现在有两个查询条件
  // 有你没我，有我没你
  if (req.body.cateId && req.body.cateId.trim().length > 0) {
    var cateId = req.body.cateId;
    queryCondition = {
      cateId: cateId
    };
  }

  if (req.body.title && req.body.title.trim().length > 0) {
    var title = req.body.title;
    queryCondition = Object.assign(queryCondition, {
      title: new RegExp(title, 'i')
    });
  }

  console.log(queryCondition);

  Comment.paginate(queryCondition, { page: +page, limit: +rows }, function(
    err,
    result
  ) {
    result.rows = result.docs;
    delete result.docs;
    res.json(result);
  });
};
