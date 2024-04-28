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
        "password": "Admin@1234",
        "email": "admin@admin.com",
        "firstName": "admin",
        "lastName": "admin",
        "isActive": true,
        "isAdmin": true,
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
        "city": "London",
        "bio": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quae totam dolores eius eos iure doloremque quasi nihil. Ea reprehenderit possimus cumque quo accusantium quia sit rem delectus quaerat minus ab esse minima repellendus molestiae eligendi nemo dignissimos repellat rerum consequuntur deleniti, quisquam quae. Consectetur ipsa perferendis nesciunt earum quaerat?"
    })

    /* Finished */
    console.log('* Synchronized.')
}