"use strict"

// sync():

module.exports = async function () {

    // return null;

    /* REMOVE DATABASE */
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
   

    /* User */
    const User = require('../models/user')

    await User.create({
        "_id": "65343222b67e9681f937f001",
        "username": "admin",
        "password": "aA?123456",
        "email": "admin@site.com",
        "firstName": "admin",
        "lastName": "admin",
        "isActive": true,
        "isStaff": true,
        "isAdmin": true
    })

    /* Finished */
    console.log('* Synchronized.')
}