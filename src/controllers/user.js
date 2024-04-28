"use strict";

const passwordEncrypt = require("../helpers/passwordEncrypt");
const User = require("../models/user");
const Token = require("../models/token");
const sendMail = require("../helpers/sendMail");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

    //! If not an admin, they can only list their own record. Normally, I handle this in the route with permissions, but I can do it this way here as well.

    const customFilters = req.user?.isAdmin ? {} : { _id: req.user._id };
    const data = await res.getModelList(User, customFilters);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User, customFilters),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                    "image": "https://...",
                    "city": "test",
                    "bio": "test"
                }
            }
        */

    req.body.isAdmin = false;
    const data = await User.create(req.body);

    // sendMail(
    //   data.email,
    //   "Welcome",
    //   `
    //         <h1>Welcome ${data.username}</h1>
    //         <p>Welcome to our CactusInk blog page ${data.username}.As you share knowledge, it becomes beautiful. We wish you enjoyable reading and writing.</p>
    //     `
    // );

    //! Auto Login
    const tokenData = await Token.create({
      userId: data._id,
      token: passwordEncrypt(data._id + Date.now()),
    });

    res.status(201).send({
      error: false,
      token: tokenData.token,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

    const customFilters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user._id };

    const data = await User.findOne(customFilters);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */
    const customFilters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.user._id };

    //! When updating the data, the admin information may come as true or false. However, regardless of what comes, I delete the incoming data, so that the admin status cannot be changed in new records except by the admin.

    if (!req.user?.isAdmin) {
      delete req.body.isAdmin;
    }

    const data = await User.updateOne(customFilters, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await User.findOne(customFilters),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

    //! I've implemented it so that users cannot delete their own records. Only admins can delete records, which I've handled with permissions.

    if (req.params.id != req.user._id) {
      const data = await User.deleteOne({ _id: req.params.id });

      res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,
        data,
      });
    } else {
      //! Admin cannot delete themselves.
      res.errorStatusCode = 403;
      throw new Error("You can not remove your account.");
    }
  },
};
