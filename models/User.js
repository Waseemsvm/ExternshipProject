const mongoose = require('mongoose')

const profileImage = '..public/uploads/default/profileDefault.jpg' 

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6, 
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    } ,
    profilePic: {
        type: String,
        default: profileImage
    },
    sentRequestsTo:{
        type: Array,
        default: []
    },
    receivedRequestsFrom:{
        type: Array,
        default: []
    },
    friendsList:{
        type: Array,
        default: []
    },
    blockList:{
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    }, 
    updated_at:{
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('User', UserSchema);