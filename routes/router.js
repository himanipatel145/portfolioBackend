const express = require("express");
const router = express.Router();
const Contact = require("../model/contactSchema");
const upload = require("../middleware/uploadFile");

router.post("/contactMe", upload.single("files"), async (req, res) => {
  const { name, email, opportunity, companyName, message, contactNumber } =
    req.body;
  const file = req.file;
  if (
    !name ||
    !email ||
    !opportunity ||
    !companyName ||
    !message ||
    !contactNumber
  ) {
    return res
      .status(422)
      .json({ error: "Please fill all the fields properly!" });
  }

  try {
    const fileUrl = file
      ? `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      : null;
    const newUser = new Contact({
      name,
      email,
      opportunity,
      companyName,
      message,
      contactNumber,
      files: fileUrl,
    });

    const createdNewUser = await newUser.save();
    if (createdNewUser) {
      res.status(201).json({
        message: "Your contact details have been received successfully!",
        user: {
          name: createdNewUser?.name,
          email: createdNewUser?.email,
          opportunity: createdNewUser?.opportunity,
          companyName: createdNewUser?.companyName,
          message: createdNewUser?.message,
          contactNumber: createdNewUser?.contactNumber,
          files: createdNewUser?.files,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An issue occurred during the contact creation process.",
      error: error.message || "Internal Server Error",
    });
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
      .json({ message: "Error deleting contacts data", error: error }); // Use 'error' instead of 'err'
  }
});

module.exports = router;
