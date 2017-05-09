var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

function login(req){
  if(req.session==true){
    return true;
  }else return false;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});
router.post('/login', function(req, res, next){
  var name = req.param("name");
  var password = req.param("password");
  var db = req.db;
  var collection = db.get("user");
  collection.find({"user":name, "password":password}, function(err, docs){
    if(err || docs.length==0){
      res.json({"msg":"Usuari o contrasenya incorrectes","login":false});
    }

    console.log(docs[0].user);
    req.session.user = docs[0].user;
    req.session.session = true;
    res.json({"msg":"Benvingut/da "+ req.session.user, "session":true, "login":true});

});
});

router.post('/save', function(req, res, next){
  if(req.files){
    return res.status(400).send("No hi han arxius per pujar");
  }
  var db = req.db;
  var collection = db.get("posts");
  var body = req.body;

  collection.insert({
    "title":post.title,
    "description":post.description,
    "img":'images/'+post.title+'.jpg',
    "file":'files/'+post.title+'.pdf',
    "body":post.body,
    "activate":post.active,
    "date_pub": req.moment(Date.now()).format('MM/DD/YYYY')
  }, function(err,docs){
    if(err){
      return res.json({"msg":err.message});
    }

    var file = req.files.sampleImage;
    var img = req.files.sampleFile;

    console.log(img+" and "+file);

      img.mv('public/images/'+req.param("title")+'.jpg', function(err){
      if(err){
        return res.status(500).send(err);
      }
    });
    file.mv('public/files/'+req.param("title")+'.jpg', function(err){
      if(err){
        return res.status(500).send(err);
      }
      res.render("admin/llista",{msg:"Dessat correctament"});
    });
    });
  });
module.exports = router;
