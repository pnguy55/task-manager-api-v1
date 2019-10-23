const express = require('express')
// Data model
const Task = require('../models/task')

const router = new express.Router()

router.get('/tasks', async (req, res) => {

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

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findById(_id)

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        // Direct communication with server is no go for mongoose middleware
        // const task_update = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send(task)
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router