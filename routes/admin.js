var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

function login(req){//Reviso que haya una session activada , cada ruta lo comprueva, antes de comenzar el codigo.
  if(req.session.session==true){
    return true;
  }else return false;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});
router.post('/posarOrd', function(req, res, next){
  var db = req.db;
  var collection = db.get("posts");
  var objId = new ObjectID(req.param("id"));
  var ord = req.param("ord");

  collection.update({_id:objId},{$set:{
    "ord": ord
  }},function(err, doc){
    if(err){
      res.json({"msg":"No sa pogut actualitzar l'ordre dek l'article, err ="+ err.message});
    }
    res.json({"msg":"S'ha dessat l'ordre correctament"});
  });

});
router.post('/getPost', function(req,res,err){//obtiene todos los parametros de un Post i los devuelve al templete editar.html
    if(login(req)){
      var db = req.db;
      var collection = db.get("posts");
      var objId = new ObjectID(req.param("id"));
      collection.findOne({_id:objId},{}, function(err, doc){
        if(err){
          res.json({"msg":"Error al obtenir el registre err ="+err.message});
        }
        res.json({"msg":"Dades obtingudes","data":doc});
      });
    }else{
      res.json({"msg":"Has de iniciar sessió per efectuar aquesta acció"});
    }
router.post("/editPost", function(req, res, next){// Muy parecido al add pero miramos si hay ficheros adjutnos, porque en caso de que no allan, no actualizaremos los valores img ni file
  if(login(req)){

    var db = req.db;
    var collection = db.get("posts");
    var post = req.body.data;
    post = JSON.parse(post);
    var id = post._id;
    console.log(id);
    var objId =  new ObjectID(id);
      collection.update({_id:objId},{$set:{
        "title":post.title,
        "description":post.description,
        "body":post.body,
        "activate":post.active,
        "date_pub": req.moment(Date.now()).format('MM/DD/YYYY')
      }},function(err, docs){
            if(err){
              res.json({"msg":"No sa pogut actualitzar l'article, err ="+ err.message});
            }
            res.json({"msg":"S'ha actualizat correctament", "data":docs});
      });
  }else{
      res.json({"msg":"Has de iniciar sessió per efectuar aquesta acció"});
  }

});

});
router.post('/drop', function(req, res, next){
  if(login(req)){
    var db = req.db;
    var collection = db.get("posts");
    var id = req.body.id;
    var objId =  new ObjectID(id);
    console.log(objId);
    collection.remove({_id: objId},function(err, doc){
    if(err){
      res.json({"msg":"No s'ha pogut eliminar el article, err = " + err.message});
    }
    try{
      var file = "public/"+req.param("file");
      var img = "public/"+req.param("img");
      var file2 = "public/"+req.param("file2");
      fs.unlink(file);
      fs.unlink(img);
      fs.unlink(file2);
    }catch(err){
      res.json({"msg":"No s'ha pogut eliminar el fitxers, possiblement peque no hi han... err = " + err.message});
    }
    res.json({"msg":"S'ha eliminat l'article correctament = "+doc });
  });
}else{
  res.json({"msg":"Has de iniciar sessió per efectuar aquesta acció"});
}
});
router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.json({"msg":"S'ha tencat la sessió correctament.", "session":false});
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
  if(login(req)){
  var db = req.db;
  var collection = db.get("posts");

  collection.find({},{sort:{'ord': 1}},function(err,docs){
    if(err){
      res.json({"msg":"error en recuperar els articles"});
    }
    res.send(docs);
  });
}else{
  res.json({"msg":"Has de iniciar sessió per efectuar aquesta acció"});
}
});

router.post('/save', function(req, res, next){
  if(login(req)){
    if(!req.files){
      return res.status(400).send("No hi han arxius per pujar");
    }
    var db = req.db;
    var collection = db.get("posts");
    var post = req.body.data;
    if(req.files.file!==undefined){
      var file = req.files.file;
    }else{
      var file = {"name":undefined};
      console.log(file);
    }
    if(req.files.file2!==undefined){
      var file2 = req.files.file2;
    }else{
      var file2 = {"name":undefined};
      console.log(file2);
    }
    if(req.files.image!==undefined){
      var img = req.files.image;
    }else{
      var img = {"name":undefined};
      console.log(img);
    }

    post = JSON.parse(post);
    console.log("body de la solicitud ="+post);

    collection.insert({
      "title":post.title,
      "description":post.description,
      "img":'upload/images/'+ (img.name !== undefined ? img.name : "undefined"),
      "file":'upload/files/'+ (file.name !== undefined ? file.name : "undefined"),
      "file2":'upload/files/'+ (file2.name !== undefined ? file2.name : "undefined"),
      "body":post.body,
      "activate":post.active,
      "date_pub": req.moment(Date.now()).format('MM/DD/YYYY'),
      "filename":file.name,
      "filename2":file2.name,
      "imgname":img.name,
    }, function(err,docs){
      if(err){
        return res.json({"msg":err.message});
      }

      console.log(img.name+" and "+file);
      if(img.name!=undefined){
        img.mv('public/upload/images/'+img.name, function(err){
          if(err){
            res.json({"msg":err});
          }
        });
      }
      if(file2.name!=undefined){
        file2.mv('public/upload/files/'+file2.name, function(err){
          if(err){
            res.json({"msg":err});
          }
        });
      }
      if(file.name!=undefined){
        file.mv('public/upload/files/'+file.name, function(err){
          if(err){
            res.json({"msg":err});
          }
        });
      }
      });
      res.json({msg:"Dessat correctament"});
      return 0;
    }else{
      res.json({"msg":"Has de iniciar sessió per efectuar aquesta acció"});
    }
  });
module.exports = router;
