"use strict";

const { set } = require("mongoose");
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
      // required: [true, "Image field must be required"],
      validate: {
        validator: function (img) {
          return /(https?:\/\/.*\.(?:png|jpg))/i.test(img);
        },
        message: (props) => `${props.value} is not a valid image url!`,
      },
    },

    isPublish: {
      type: Boolean,
      default: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    visitors: [],
    
    countOfVisitors: {
      type: Number,
      get: function () {
        return this.visitors.length;
      },
    },
  },
  {
    collection: "blogs",
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Blog", blogSchema);
