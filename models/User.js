const mongoose = require('mongoose')

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