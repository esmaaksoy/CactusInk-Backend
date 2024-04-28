"use strict";

const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "List Blogs"
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
    const data = await res.getModelList(Blog, {}, [
      { path: "categoryId", select: "name" },
      "userId",
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Blog),
      data,
    });
  },

  create: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Create Blog"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "name": "Blog"
            }
        }
    */
    const data = await Blog.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Single Blog"
        */
    const data = await Blog.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Update Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Blog 1"
                }
            }
        */
    const data = await Blog.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Blog.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Delete Blog"
        */
    const data = await Blog.deleteOne({ _id: req.params.is });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },

  getLike: async (req, res) => {},

  postLike: async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    const didUserLike = blog.likes.map((item) => item == req.user.id);

    if (didUserLike) {
      blog.likes.push(req.user.id); //buraya userId de pushlayabilirim
      res.status(200).send({
        error: false,
        didUserLike: didUserLike,
        countOfLikes: blog.likes.length,
      });
    } else {
      const likeUserId = blog.likes.find((item) => item == req.user.id);
      blog.likes.remove(likeUserId);

      res.status(404).send({
        error: true,
        didUserLike: didUserLike,
        countOfLikes: blog.likes.length,
      });
    }
  },
};
