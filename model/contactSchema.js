const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    opportunity: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    files: {
      type: String,
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("himaniPortfolio", contactSchema);
module.exports = Contact;
