const express = require("express");
const User = require("./models/user");

const app = express();
const { connectToDB } = require("../src/config/db")

// Parsing the body data
app.use(express.json())

// Sign up API
app.post('/signup', async (req, res) => {
  // Dynamically getting the user data
  const userObj = req.body;

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
