const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
     },
     tokens: [{
         token: {
             type: String,
             required: true
         }
     }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    // this saves the signed web token, and also converts the user id to a string as that's what
    // jwt is expecting
    const token = jwt.sign({ _id: user.id.toString()}, 'codephony')
    // push token to special token array above and save to DB
    user.tokens.push({ token })
    await user.save()

    return token
}

// Make static function accessible by the router to search the database for a user
userSchema.statics.findByCredentials = async (email, password) => {
    //searches for user by the email
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to log in')
    }

    // Checks the password for a match
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to log in')
    }

    return user
}


// Pre does something before saving to the database, post does it after
// Important to not use arrow function because it needs to be bound by this
// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER 
// EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER 
// EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER 
const User = mongoose.model('User', userSchema)

module.exports = User