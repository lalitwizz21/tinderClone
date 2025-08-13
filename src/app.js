const express = require("express");
const User = require("./models/user");

const app = express();
const { connectToDB } = require("../src/config/db")

app.post('/signup', async (req, res) => {
  const userObj = {
    firstName: "Roman",
    lastName: "Reigns",
    username: "Roman21",
    email: "roman21@gmail.com",
    password: "Roman123",
    age: 39
  }

  // Created new instance of User model.
  const user = new User(userObj);

  try {
    // Created the user and send the success message.
    await user.save();
    res.send("User created successfully...");
  } catch (err) {
    res.status(400).send(`Unable to create the user: ${err.message}`);
  }
});

// Connecting to the DB.
connectToDB().then(() => {
  console.log("DB is successfully connected.")
  app.listen("9000", () => {
    console.log("Server is running on port 9000");
  })
}).catch((error) => {
  console.error("DB connection is not successful.")
})
