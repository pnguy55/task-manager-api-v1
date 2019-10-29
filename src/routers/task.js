const express = require('express')
// Data model
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    // takes info from normal request body
    //const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

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

router.get('/tasks', auth, async (req, res) => {
    try {
        // finds all tasks with the correct owner and lists them
        const list_of_tasks = await Task.find({owner: req.user._id})
        //or
        // await req.user.populate('tasks').execPopulate()
        // res.send(req.user.tasks)
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

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const owner = req.user._id
    try {
        const task = await Task.findOne({ _id, owner })

        if (!task){
            return res.status(404).send()
        }

        res.send(task)
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

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }
    const _id = req.params.id
    const owner = req.user._id

    try {
        const task = await Task.findOne({ _id, owner })

        // Direct communication with server is no go for mongoose middleware
        // const task_update = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        
        // the check for valid task must go before the actual update below
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const owner = req.user._id

    try {
        const task = await Task.findOneAndDelete({ _id, owner })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router