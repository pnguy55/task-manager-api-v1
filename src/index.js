const express = require('express')
const bcrypt = require('bcrypt')
require('./db/mongoose')

// Routes
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//auto parse JSON
app.use(express.json())

// Must register the router for use
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare(password, hashedPassword)
    console.log(isMatch)
}

myFunction()