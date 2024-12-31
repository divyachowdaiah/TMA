const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active',
    },
    priority: { // Add priority field
        type: String,
        enum: ['low', 'medium', 'high'], // Define acceptable values
        default: 'low',
    },
    
    
    
});

module.exports = mongoose.model('Task', TaskSchema);
