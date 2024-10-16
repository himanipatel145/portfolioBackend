const express = require("express");
const router = express.Router();
const Contact = require("../model/contactSchema");

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
