const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const status = new Schema({
  name: String,
  decription: String,
  img: String,
  comments: Array
  // createAt: {type:Date, default: Date.now}
  
},{
  timestamps:true
});




module.exports =  mongoose.model('status', status);;