// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// Decontructed the object returned by require('mongodb')
const {MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp)

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to databse!')
    }
    
    const db = client.db(databaseName)

    // very specific, requires callback
    // db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // general find, no callback needed
    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 27 }).count((error, users) => {
    //     console.log(users)
    // })

    db.collection('tasks').find({ completed: false }).toArray((error, task) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(task)
    })



    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //         if(error) {
    //             return console.log('Unable to insert user')
    //         }
    //         console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Feed baby',
    //         completed: true
    //     }, {
    //         description: "Bathe baby",
    //         completed: true
    //     }, {
    //         description: "Clothe baby",
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })
})



