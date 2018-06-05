const mongoose=require('mongoose');
const Cate=require('../models/cate.model');

// post
exports.create = function(req, res, next) {
    const cate = new Cate(req.body);
    cate.save().then(data => {
      res.json(data);
    });
  };
  // update
exports.update = function(req, res, next) {
    const id = req.params.id; // req.query req.body req.params
  
    Cate.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
      res.json(data); // 特别强调，在更新阶段，这个data是上一次没有更新完成的数据，而不是已经更新完成的数据
    });
  };



  exports.tree=function(req,res,next){
    var type=req.params.type;
    Cate.find({type:type},function(err,data){
      //实现递归
      var rpTree=reverseTree(data,null);
      res.json(rpTree);
    });
  };


  exports.remove=function(req,res,next){
    var id=req.params.id;
    var ids=[];
    Cate.findOne({_id:id},function(err,doc){
      if(doc){
        ids=[doc._id];
        doc.getChildren().then(function(docs){
          var docsl=docs.length;
          for(var i=0;i<docsl;i++){
            ids.push(docs[i]._id);
          }
          Cate.remove({_id:{$in:ids}}).then(data=>{
            res.json({status:200,message:'删除数据成功'});
          })
        });
      }
    })
  };


  //pid===>parentId
  //data 类型 array
  function reverseTree(data,pid){
    var result=[],
    temp;
    var data=JSON.parse(JSON.stringify(data));
    //将数据模型的对象转成字符串，再将字符串转成对象，这时候的对象就成了javascript的普通Object
    for(var i in data){
      if(data[i].parentId == pid){
        result.push(data[i]);
        temp=reverseTree(data,data[i]._id)
        if(temp.length >0){
          data[i].children =temp;
        }
      }
    }
    return result;
  }
