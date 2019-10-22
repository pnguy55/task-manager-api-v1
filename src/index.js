const express = require('express')
require('./db/mongoose')

// Data models
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

//auto parse JSON
app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }       

    // Promise version
    // User.find({}).then((users) => {
    //     res.status(200).send(users)
    // }).catch((e) => {
    //     // change status code to 500 for internal server error and no need to send back error msg
    //     res.status(500).send()
    // }) 
})

// find user by id
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById({ _id })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
    // Promise version

    // User.findById({_id}).then((user) => {
    //     if (!user) {
    //         // in the case that the find goes through but no user exists
    //         return res.status(404).send()
    //     }
    //     // automatically has status code of 200
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // }) 
})

app.patch('/users/:id', async (req, res) => {
    // Need to to extract keys from the request body
    const updates = Object.keys(req.body)
    // Give user an error message if trying to update a nonexistent field
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!'})
    }

    const _id = req.params.id
    
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})


// the colon followed by a variable is how you access url params with express
// app.get('/users/:name', (req, res) => {
//     // save that param like this
//     const name = req.params.name.replace(/^\w/, c => c.toUpperCase())

//     User.findOne({name: name}).then((user) => {
//         res.status(200).send(user)
//     }).catch((e) => {
//         // change status code to 500 for internal server error and no need to send back error msg
//         res.status(500).send()
//     }) 
// })

app.delete('/users/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const delete_user = await User.findByIdAndDelete(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send()
    } catch (e) {
        return res.status(500).send()
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        const saveTask = await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    //Promise version

    // task.save().then(() => {
    //     // success error code followed by the task
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

app.get('/tasks', async (req, res) => {

    try {
        const list_of_tasks = await Task.find({})
        res.send(list_of_tasks)
    } catch (e) {
        res.send(500).send()
    }

    //Promise version
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // }) 
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const find_task = await Task.find({ _id })
        if (!find_task){
            return res.status(404).send()
        }

        res.send(find_task)
    } catch (e) {
        res.status(500).send()
    }
    //Promise version

    // Task.find({_id: id}).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // }) 
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }
    const _id = req.params.id

    try {
        const task_update = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task_update) {
            return res.status(404).send()
        }
        res.send(task_update)
    } catch (e) {
        res.status(400).send()
    }
})

app.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    const deleted_task = Task.findByIdAndDelete(_id)
    try {
        if (!deleted_task) {
            return res.status(404).send()
        }

        res.send(deleted_task)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

