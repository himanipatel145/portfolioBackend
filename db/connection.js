const mongoose = require("mongoose");
const Admin = require("../model/adminUserSchema");

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Connection Successful"))
  .catch((error) => console.log("Error", error));
