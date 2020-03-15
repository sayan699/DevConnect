const mongoose = require('mongoose');
var d = new Date().toString();
var t = d.split(' ').slice(0,5).join(' ')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiJ4GCmQ-s8qnIVmriuyjYQ8fgfZ-iTwMQfIc_E6Y6R3ECy-P7'
    },
  date: {
    type: String,
    default: t
  }
});

module.exports = User = mongoose.model('users', UserSchema);
