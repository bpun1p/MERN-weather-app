const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  id : String,
  location: String
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);;