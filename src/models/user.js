const mongoose = require('mongoose')
const validator = require('validator')

// EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER 
// EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER 
// EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER 
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
     },
     password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the phrase "password".')
            }
        }
     }
})

module.exports = User