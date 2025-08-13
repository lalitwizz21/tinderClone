const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose.connect("mongodb+srv://hariwizz21:huHEldqXeo6BHbEq@tinderclone.rxoxj6i.mongodb.net/?retryWrites=true&w=majority&appName=tinderClone")
}

module.exports = {
  connectToDB
}