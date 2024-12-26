const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
    
const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
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
    roles: [
        {
            name: {
                type: String,
            },
            project_id: {
                type: Number,
            },
            team_id: {
                type: Number,
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(AutoIncrement, { inc_field: 'user_id' });
    
const User = mongoose.model('User', userSchema);
    
module.exports = User;