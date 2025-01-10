const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
    
const projectSchema = new mongoose.Schema({
    project_id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_by: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

projectSchema.plugin(AutoIncrement, { inc_field: 'project_id' });
const Project = mongoose.model('Project', projectSchema);
    
module.exports = Project;