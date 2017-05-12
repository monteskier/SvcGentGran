var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getAllElements', function(req, res, next){
  var db = req.db;
  var collection = db.get("posts");

  collection.find({"activate":true},{}, function(err, docs){
    if(err){
      res.json({"msg":"Error al descarregar les dades, err="+err.message});
    }
    res.send(docs);
  });

});

module.exports = router;
