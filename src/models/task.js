const mongoose = require('mongoose')
const validator = require('validator')

// CREATING A TASK OBJECT MODEL CREATING A TASK OBJECT MODEL CREATING A TASK OBJECT MODEL CREATING A TASK OBJECT MODEL
// CREATING A TASK OBJECT MODEL CREATING A TASK OBJECT MODEL CREATING A TASK OBJECT MODEL CREATING A TASK OBJECT MODEL
// CREATING A TASK OBJECT MODEL CREATING A TASK OBJECT MODEL CREATING A TASK OBJECT MODEL CREATING A TASK OBJECT MODEL


const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: trim
    }, 
    completed: {
        type: Boolean,
        default: fals
    }
})

module.exports = Task