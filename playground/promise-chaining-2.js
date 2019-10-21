require('../src/db/mongoose')
const Task = require('../src/models/task')

// 5da4d420f7146353fc3b97e4

Task.findByIdAndRemove('5da4d420f7146353fc3b97e5').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
    return Task.countDocuments({})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})