const mongoosoe = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  location: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);
module.export = Location;