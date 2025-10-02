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

// Get the user list.
app.get("/feed", async (req, res) => {
  try {
    const userList = await User.find();
    if (userList?.length > 0) {
      res.json(userList)
    } else {
      res.status(404).send("No user Found.")
    }
  } catch (e) {
    res.status(400).send("Something went wrong " + e?.message)
  }
});

// Find user by id.
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).send("User not found")
    }
  } catch (e) {
    res.status(400).send("Something went wrong " + e?.message)
  }
})

// Fetch user by email
app.get("/user/:mail", async (req, res) => {
  const mail = req.params.mail;

  try {
    const user = await User.find({ email: mail });
    if (user?.length) {
      res.status(200).json(user)
    } else {
      res.status(404).send("User not found")
    }
  } catch (e) {
    res.status(400).send("Something went wrong " + e?.message)
  }
})

//  delete a user by id.
app.delete('/user/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUSer = await User.findByIdAndDelete(id);
    res.status(200).json(deletedUSer)
  } catch (e) {
    res.status(400).send("Something went wrong " + e?.message)
  }
});

// Update a user by Id.
app.patch("/user", async (req, res) => {
  const id = req.body.id;
  const userData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      returnDocument: "after"
    });
    res.json(updatedUser);
  }
  catch (e) {
    res.status(400).send("Something went wrong " + e?.message)
  }
});

// Update a user by email.
app.patch("/userByMail", async (req, res) => {
  const mail = req.body.mail;
  const userData = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ email: mail }, userData);
    res.json(updatedUser)
  } catch (e) {
    res.status(400).send("Something went wrong " + e?.message)
  }
})

// Connecting to the DB.
connectToDB().then(() => {
  console.log("DB is successfully connected.")
  app.listen("9000", () => {
    console.log("Server is running on port 9000");
  })
}).catch((error) => {
  console.error("DB connection is not successful.")
})
