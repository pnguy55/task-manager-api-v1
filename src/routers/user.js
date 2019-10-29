const express = require('express')
// Data model
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()


router.get('/test', (req, res) => {
    res.send('From a new file')
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// The log-in endpoint
router.post('/users/login', async (req, res) => {
    try {
        // runs functions that get user info and token info from the server
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // if an error isn't thrown by the findByCredentials static function it will run next
        // sends user info and token to the client from the server
        
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try{
        req.user.tokens = []

        req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/users/me', auth, async (req, res) => {
    // Return logged in user's info
    res.status(200).send(req.user)
})

// find user by id
router.get('/users/:id', async (req, res) => {
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

router.patch('/users/update-profile', auth, async (req, res) => {
    
    // Need to to extract keys from the request body
    const updates = Object.keys(req.body)
    // Give user an error message if trying to update a nonexistent field
    const allowedUpdates = ['name', 'email','password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!'})
    }

    try {
        // saves the user from auth as a variable to easy use
        const user = req.user

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        res.status(201).send(user)
    } catch (e) {
        res.status(400).send()
    }
})


// the colon followed by a variable is how you access url params with express
// router.get('/users/:name', (req, res) => {
//     // save that param like this
//     const name = req.params.name.replace(/^\w/, c => c.toUpperCase())

//     User.findOne({name: name}).then((user) => {
//         res.status(200).send(user)
//     }).catch((e) => {
//         // change status code to 500 for internal server error and no need to send back error msg
//         res.status(500).send()
//     }) 
// })

router.delete('/users/delete-me', auth, async (req,res) => {
    try {
        // because our auth middleware returns the user object, we have access to req.user
        // and because our auth checks for a user we no longer need to access that in the endpoint
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // }

        // so instead of the above we just straight up remove the user document with mongoose
        await req.user.remove()
        res.send(req.user)

        res.send()
    } catch (e) {
        return res.status(500).send()
    }
})



module.exports = router