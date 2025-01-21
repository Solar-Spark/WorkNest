const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    project_id: {
        type: Number,
    },
    team_id: {
        type: Number,
    },
}, 
{ _id: false });

module.exports = roleSchema;