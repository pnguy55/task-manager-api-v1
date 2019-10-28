const express = require('express')
const jwt = require('jsonwebtoken')
require('./db/mongoose')

// Routes
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     // Prints HTTP method used, and path gets the path
//     console.log(req.method, req.path)

//     // Only runs on a Get request
//     if (req.method === 'GET') {
//         // Disables get requests
//         res.send('Get Requests are disabled')
//     } else {
//         next()
//     }
// })

// Another middleware example
// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })
//auto parse JSON


app.use(express.json())

// Must register the router for use
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const myFunction = async () => {
    // the random string is a secret key you provide
    const token = jwt.sign({ _id: 'abc1234!dd' }, 'codephony', { expiresIn: '7 days' })

    // console.log(token)

    const data = jwt.verify(token, 'codephony')
    // console.log(data)
}

myFunction()