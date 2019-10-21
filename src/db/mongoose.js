const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// const me = new User({
//     name: 'Andrew',
//     age: 27,
//     password: 'wer12dsafe'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })



// const task1 = new Task({
//     description: 'Change baby',
//     completed: true
// })

// task1.save().then(() => {
//     console.log(task1)
// }).catch((error) => {
//     console.log('Error! ', error)
// })