const mongoose = require("mongoose");

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Connection Successful"))
  .catch((error) => console.log("Error", error));
