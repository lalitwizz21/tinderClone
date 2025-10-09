const validator = require("validator")

function signUpValidator(body) {
  const { firstName, lastName, email, password } = body;
  if (!firstName || !lastName) {
    throw new Error("Name is required.")
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid.")
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong.")
  }
}

module.exports = {
  signUpValidator
}