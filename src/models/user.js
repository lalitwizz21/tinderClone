const { Schema, model } = require("mongoose");
const validator = require("validator");

// Created the user schema and model for generating user documents.
const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
    minLength: 4,
    maxLength: 20,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
    minLength: 4,
    maxLength: 20,
  },
  age: {
    type: Number,
    min: 18,
    max: 80
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
    minLength: 8,
    maxLength: 50,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("The email is not valid.")
      }
    }
  },
  password: {
    type: String,
    trim: true,
    require: true,
    minLength: 8,
    maxLength: 60,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("The password is not strong enough.")
      }
    }
  },
  gender: {
    type: String,
    trim: true,
    lowercase: true,
    enum: ["male", "female", "other"]
  },
  description: {
    type: String,
    trim: true,
    maxLength: 200,
    default: "This is a default description.",
  },
  imgUrl: {
    type: String,
    trim: true,
    maxLength: 400,
    default: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("The URL is not valid.")
      }
    }
  },
  skills: {
    type: [String],
    validate(value) {
      if (value?.length > 10) {
        throw new Error("Skills can't be more than 10.");
      }
    }
  }
}, {
  timestamps: true
});

const User = model("User", userSchema);

module.exports = User;
