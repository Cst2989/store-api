const mongoose = require('mongoose');
const Schema   = mongoose.Schema,
      model    = mongoose.model.bind(mongoose),
      ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = Schema({
  id: ObjectId,
  name: String,
  year: String,
  location: String,
  image: String,
  price: Number,
  description: String,
});
const Product      = model('Product', productSchema);

module.exports = {Product};
