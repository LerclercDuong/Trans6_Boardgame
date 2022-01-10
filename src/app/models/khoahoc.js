const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const khoahocs = new Schema({
  name: String,
  decription: String,
  slug: String,
  videoID: String,
  img: String
});




module.exports =  mongoose.model('khoahoc', khoahocs);;