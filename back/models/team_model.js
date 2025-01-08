const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
    
const teamSchema = new mongoose.Schema({
    team_id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    project_id: {
        type: Number,
        required: true,
    },
    members: {
        type: [Number],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

teamSchema.plugin(AutoIncrement, { inc_field: 'team_id' });

const Team = mongoose.model('Team', teamSchema);
    
module.exports = Team;