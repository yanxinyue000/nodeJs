var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/user.controller');
/* GET users listing. */
router.post('/data', dataCtrl.create);
router.post('/data/removes', dataCtrl.removes);
router.get('/data/:id', dataCtrl.get);
router.put('/data/:id', dataCtrl.update);
router.delete('/data/:id', dataCtrl.delete);
router.post('/list', dataCtrl.list);

module.exports = router;
