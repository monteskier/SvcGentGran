var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getAllElements', function(req, res, next){
  var db = req.db;
  var collection = db.get("posts");

  collection.find({"activate":true},{sort:{date_pub:-1}}, function(err, docs){
    if(err){
      res.json({"msg":"Error al descarregar les dades, err="+err.message});
    }
    res.send(docs);
  });

});
router.post('/detall', function(req, res, next){
  var db = req.db;
  var collection = db.get("posts");
  var objId = new ObjectID(req.param("id"));
  collection.findOne({_id:objId},{}, function(err, doc){
    if(err){
      res.json({"msg":"Error al obtenir el registre err ="+err.message});
    }
    res.json({"msg":"Dades obtingudes","data":doc});
  });
});

module.exports = router;
