"use strict";

const { mongoose } = require("../configs/dbConnection");

const blogSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "categoryId field must be required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId field must be required"],
    },

    title: {
      type: String,
      trim: true,
      required: [true, "Title field must be required"],
    },

    content: {
      type: String,
      trim: true,
      required: [true, "Content field must be required"],
    },

    image: {
      type: String,
      trim: true,
      required: [true, "Image field must be required"],
      validate: {
        validator: function (img) {
          return /(https?:\/\/.*\.(?:png|jpg))/i.test(img);
        },
        message: (props) => `${props.value} is not a valid image url!`,
      },
    },

    published: {
      type: Boolean,
      default: true,
    },
    likes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    comments:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ]

  },
  {
    collection: "blogs",
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema)
