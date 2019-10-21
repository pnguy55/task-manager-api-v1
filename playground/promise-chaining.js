require('../src/db/mongoose')
const User = require('../src/models/user')

// 5da4d420f7146353fc3b97e4

User.findByIdAndUpdate('5da4d420f7146353fc3b97e4', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})