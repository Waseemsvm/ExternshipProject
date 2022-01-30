const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    likes: {
        type: Number,
        min: 0
    },
    unlikes:{
        type: Number,
        min: 0
    },
    replies: {
        type: Array,
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Comment', CommentSchema);
