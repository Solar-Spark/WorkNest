const mongoose = require('mongoose');
const roleSchema = require('./role_model');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [roleSchema],
        default: [{ name: "USER" }],
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(AutoIncrement, { inc_field: 'user_id' });
    
const User = mongoose.model('User', userSchema);
    
module.exports = User;