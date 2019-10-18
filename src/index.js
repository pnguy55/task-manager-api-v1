const express = require('express')
require('./db/mongoose')

// Data models
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

//auto parse JSON
app.use(express.json())

app.post('/users', (req, res) => {

    // console.log(req.body)
    // res.send('testing')

    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/tasks', (req, res) => {

    // console.log(req.body)
    // res.send('testing')

    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

