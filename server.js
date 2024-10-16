const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 3333;

require("./db/connection");

const routes = require("./routes/router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(routes);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
