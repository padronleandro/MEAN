var express = require('express');
var router = express.Router();
 
var auth = require('./routes/auth.js');
var product = require('./routes/products.js');
var user = require('./routes/users.js');

var mongoose = require('mongoose');
var dbHost = 'mongodb://127.0.0.1:27017/apidb';
mongoose.connect(dbHost);
var db = mongoose.connection;
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
 
/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/products', function(req, res){
    product.find(function(err, result){
        if ( err ) throw err;
        res.json(result);
    });
});
router.get('/api/v1/product/:id', function(req, res){
    product.find({id : req.params.id },function(err, result){
        if ( err ) throw err;
        res.json(result);
    });
});
router.post('/api/v1/product/', function(req, res){
    var p = new product({
        id: req.body.id,
        name: req.body.name
    });
    p.save(function(err){
        if ( err ) throw err;
        console.log("Book Saved Successfully");
        product.find(function(err2, result2){
            if ( err2 ) throw err2;
            res.json(result2);
        });
    });
});
router.put('/api/v1/product/:id', function(req, res){
    product.update({id : {$eq: req.params.id}}, {$set: {name: req.body.name}}, function(err, result){
        if ( err ) throw err;
        res.json(result);
  });
});
router.delete('/api/v1/product/:id', function(req, res){
    product.remove({id:{$eq: req.params.id}}).exec();
    product.find(function(err, result){
        if ( err ) throw err;
        res.json(result);
    });
});
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;