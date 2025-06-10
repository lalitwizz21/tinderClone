const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Request received for / route");
})

app.listen("9000", () => {
  console.log("Server is running on port 9000");
})