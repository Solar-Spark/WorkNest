const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const taskSchema = new mongoose.Schema({
    task_id:{
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    project_id:{
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    assigned_to: {
        type: Number,
    },
    team_id: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
    
});

taskSchema.plugin(AutoIncrement, { inc_field: 'task_id' });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
