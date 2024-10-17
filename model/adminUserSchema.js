const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const AdminSchema = mongoose.Schema(
  {
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

// Hash password before saving the admin
AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Method to compare password
AdminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("himaniPortfolioAdmin", AdminSchema);

// Function to create an admin if not exists
const createAdmin = async () => {
  const admin = await Admin.findOne(
    { email: "himanipatel14597@gmail.com" },
    { email: 1, _id: 0 }
  );
  console.log(admin);

  if (!admin) {
    const newAdmin = new Admin({
      email: "himanipatel14597@gmail.com",
      password: "himanipatel145", // This will be hashed automatically
    });
    await newAdmin.save();
    console.log("Admin created successfully");
  }
};

createAdmin();

module.exports = Admin;
