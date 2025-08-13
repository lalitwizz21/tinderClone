const { Schema, model } = require("mongoose");

// Created the user schema and model for generating user documents.
const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  age: {
    type: Number
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  gender: {
    type: String
  }
});

const User = model("User", userSchema);

module.exports = User;
