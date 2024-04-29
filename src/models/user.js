"use strict";

const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "User name field must be required"],
      unique: [true, "User name field must be unique"],
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Email field must be required"],
      unique: [true, "Email field must be unique"],
      validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Email type is not correct.",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Password field must be required"],
      set: (password) => {
        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
        ) {
          return passwordEncrypt(password);
        } else {
          throw new Error("Password type is not correct.");
        }
      },
    },

    firstName: {
      type: String,
      trim: true,
      required: [true, "First name field must be required"],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name field must be required"],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    image: 
    {
      type: String,
      trim: true,
      required: [true, "Image field must be required"],
      validate: {
          validator: function(img) {
            return /(https?:\/\/.*\.(?:png|jpg))/i.test(img);
          },
          message: props => `${props.value} is not a valid image url!`
        },
    },

    city: {
        type: String,
        trim: true,
        required: [true, "city field must be required"],
    },
    
    bio: {
        type: String,
        trim: true,
        required: [true, "biography field must be required"],
        minlength: 30
    }
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
