require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')
// 5da4d420f7146353fc3b97e4

User.findByIdAndUpdate('5da4d420f7146353fc3b97e4', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount('5da4d420f7146353fc3b97e4', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

const deleteTaskAndCount = async (id) => {
    const del = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })

    return count
}

deleteTaskAndCount('5da4d4d6a1bf411ca4fdba44').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})