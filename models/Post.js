const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    }, 
    postType: {
        type: String,
        enum: ['text', 'image'],
        default: 'text'
    },
    data:{
        type: String,
        required: true
    },
    comments:{
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    dislikes:{
        type: Array,
        default: []
    },
    shares:{
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('Post', PostSchema);