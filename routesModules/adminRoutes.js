const express = require("express");
const router = express.Router();
const Contact = require("../model/contactSchema");
const Admin = require("../model/adminUserSchema");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Fill the fields properly" });
  }

  try {
    const adminLogin = await Admin.findOne({
      email: email,
    });

    if (adminLogin) {
      const isMatch = await bcrypt.compare(password, adminLogin.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      let response = {
        _id: adminLogin._id,
        email: adminLogin.email,
        phone: adminLogin.phone,
        firstName: adminLogin.firstName,
        lastName: adminLogin.lastName,
        fullName: adminLogin.fullName,
      };

      res.status(201).json({
        message: "Logged in successfully.",
        response: { ...response },
      });
    } else {
      return res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAllAdmin", async (req, res) => {
  try {
    const getAllAdminLists = await Admin.find();
    res.status(200).json({
      message: "All Admins have been successfully fetched!",
      data: getAllAdminLists,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching contacts data", error: error });
  }
});

router.get("/getAllDetails", async (req, res) => {
  try {
    const getAllDetails = await Contact.find();
    res.status(200).json({
      message: "Data has been successfully fetched!",
      data: getAllDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contacts data",
      error: error,
    });
  }
});

router.delete("/deleteAllDetails", async (req, res) => {
  try {
    const deleteAllDetails = await Contact.deleteMany({});
    if (deleteAllDetails.deletedCount > 0) {
      res.status(200).json({ message: "All data deleted successfully!" });
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
