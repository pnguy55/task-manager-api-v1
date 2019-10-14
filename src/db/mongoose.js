const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    userNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String        
    },
    age: {
        type: Number
    }
})

// EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER 
// EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER 
// EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER EXAMPLE SAVING OF NEW USER 

// const me = new User({
//     name: 'Andrew',
//     age: 'twent seven'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })