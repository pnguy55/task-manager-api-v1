#How to Start

open terminal
-/Users/PhiNguyen/mongodb/bin/mongod.exe --dbpath=/Users/PhiNguyen/mongodb-data      

open new terminal
-npm run dev


basics of full stack web app
1) set up a DB to test on
2) set up a postman to test endpoints
3) make data models with mongoose and using a schema to perform operations before and after saving data to DB, export the data models into index for use
4) Import data models into routers and create router using express, then edit endpoints on the routers
5) Create login with the following: simply put - 
    [sign-in/find account by email, compare password hash, generate+sign web token, save to user object, ]
    a) Make sure emails are unique
    b) Use schema static function to provide router with a lookup function that searches DB for the account, also runs the password through a compare function that returns the user's information
    c) run that static function in the router and make it send back the user info 
    d) download and implement jsonwebtoken npm module by creating and saving tokens to the user model
       upon sign-up and log-in
    e) 
