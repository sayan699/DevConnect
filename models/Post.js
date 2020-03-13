
var d = new Date().toString();
var t = d.split(' ').slice(0,5).join(' ')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String,
    default:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiJ4GCmQ-s8qnIVmriuyjYQ8fgfZ-iTwMQfIc_E6Y6R3ECy-P7'
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: String,
    default: t
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
