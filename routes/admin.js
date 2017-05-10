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

router.get("/llista",function(req, res, next){
  var db = req.db;
  var collection = db.get("posts");

  collection.find({},{},function(err,docs){
    if(err){
      res.json({"msg":"error en recuperar els articles"});
    }
    res.send(docs);
  });
});

router.post('/save', function(req, res, next){
  if(!req.files){
    return res.status(400).send("No hi han arxius per pujar");
  }
  var db = req.db;
  var collection = db.get("posts");
  var post = req.body.data;
  post = JSON.parse(post);
  console.log("body de la solicitud ="+post);

  collection.insert({
    "title":post.title,
    "description":post.description,
    "img":'upload/images/'+post.title+'.jpg',
    "file":'upload/files/'+post.title+'.pdf',
    "body":post.body,
    "activate":post.active,
    "date_pub": req.moment(Date.now()).format('MM/DD/YYYY')
  }, function(err,docs){
    if(err){
      return res.json({"msg":err.message});
    }

    var file = req.files.file;
    var img = req.files.image;

    console.log(img+" and "+file);

    img.mv('public/upload/images/'+post.title+'.jpg', function(err){
      if(err){
        res.json({"msg":err});
      }
    });
    file.mv('public/upload/files/'+post.title+'.pdf', function(err){
      if(err){
        res.json({"msg":err});
      }

    });
    });
    res.json({msg:"Dessat correctament"});
    return 0;
  });
module.exports = router;
