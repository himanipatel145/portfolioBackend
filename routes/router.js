const express = require("express");
const router = express.Router();

const adminRoutes = require("../routesModules/adminRoutes");
const userRoutes = require("../routesModules/userRoutes");

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);

module.exports = router;
