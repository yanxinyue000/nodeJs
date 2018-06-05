var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/Comment.controller');

router.post('/data', dataCtrl.create);
router.put('/data/:id', dataCtrl.update);
router.delete('/data/:id', dataCtrl.delete);
router.post('/list', dataCtrl.list);
router.post('/data/removes', dataCtrl.removes);
router.get('/data/:id', dataCtrl.get);
router.get('/load/:id', dataCtrl.find);


module.exports = router;
