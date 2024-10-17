const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email id already present"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    phone: {
      type: Number,
      required: true,
      min: 10,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Can not contain the string "Password"');
        }
      },
    },
  },
  { timestamps: true, versionKey: false }
);

//hashing password
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.fullName = this.firstName + " " + this.lastName;
  next();
});

const Admin = mongoose.model("admin", adminSchema);

const createAdmin = async () => {
  const admin = await Admin.findOne(
    {
      email: process.env.ADMIN_EMAIL,
    },
    { email: 1, _id: 0 }
  );

  if (!admin) {
    const newAdmin = new Admin({
      email: process.env.ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE,
      firstName: process.env.ADMIN_FIRSTNAME,
      lastName: process.env.ADMIN_LASTNAME,
      password: process.env.ADMIN_PASSWORD,
    });
    await newAdmin.save();
    console.log("Admin created successfully", newAdmin);
  }
};

createAdmin();

module.exports = Admin;
