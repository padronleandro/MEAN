var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
  name : String,
  id : Number
  
});

//mongoose.model(CLASE, ESQUEMA, COLECCION);
var product = mongoose.model('Product', productsSchema, "products");
 
module.exports = product;