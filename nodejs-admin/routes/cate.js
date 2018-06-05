var express =require('express');
var router =express.Router();   
var dataCtrl = require('../controllers/cate.controller');

router.post('/data', dataCtrl.create);
router.put('/data/:id', dataCtrl.update);
router.get('/tree/:type', dataCtrl.tree);
router.delete('/data/:id', dataCtrl.remove);


module.exports = router;
