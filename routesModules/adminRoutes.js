const express = require("express");
const router = express.Router();
const Contact = require("../model/contactSchema");
const Admin = require("../model/adminUserSchema");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminLogin = await Admin.findOne({ email: email });

    if (!adminLogin) {
      return res.status(422).json({ error: "Admin not found!" });
    }

    // Log the stored password hash for debugging
    console.log("Stored Password Hash:", adminLogin.password);

    const isPasswordMatch = await adminLogin.comparePassword(password);
    console.log("Password Match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(422).json({ error: "Invalid email or password!" });
    }

    return res.status(200).json({
      message: "Admin Login Successful!",
      user: {
        email: adminLogin.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while logging in!", error: error.message });
  }
});

router.get("/getAllDetails", async (req, res) => {
  try {
    const getAllDetails = await Contact.find();
    res.status(200).json(getAllDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching contacts data", error: error });
  }
});

router.delete("/deleteAllDetails", async (req, res) => {
  try {
    const deleteAllDetails = await Contact.deleteMany({});
    if (deleteAllDetails.deletedCount > 0) {
      res.status(200).json({ message: "All data deleted successfully" });
    } else {
      res.status(404).json({ message: "No data found to delete" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting contacts data", error: error });
  }
});

module.exports = router;
