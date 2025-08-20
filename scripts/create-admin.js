const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

// Admin schema
const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@rakibul.com" });
    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "admin123456",
      12
    );

    // Create admin
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || "admin@rakibul.com",
      password: hashedPassword,
      name: process.env.ADMIN_NAME || "Rakibul Ahsan Minar",
    });

    await admin.save();
    console.log("Admin created successfully!");
    console.log("Email: admin@rakibul.com");
    console.log("Password: admin123456");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
