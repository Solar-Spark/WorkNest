const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const taskSchema = new mongoose.Schema({
    task_id:{
        type: Number,
        unique: true
    },
    task_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

taskSchema.plugin(AutoIncrement, { inc_field: 'task_id' });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
