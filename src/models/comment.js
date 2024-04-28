"use strict";

const { mongoose } = require("../configs/dbConnection");

const CommentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "blogId field must be required"],
    },

    comment: {
      type: String,
      trim: true,
      required: true,
    },
    
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
