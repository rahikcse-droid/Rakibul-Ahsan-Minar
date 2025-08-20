const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://nrbnayon:chatters@cluster0.f6x2ow6.mongodb.net/Rahik?retryWrites=true&w=majority';

// Admin schema
const AdminSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@rakibul.com' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123456', 12);

    // Create admin
    const admin = new Admin({
      email: 'admin@rakibul.com',
      password: hashedPassword,
      name: 'Rakibul Ahsan Minar',
    });

    await admin.save();
    console.log('Admin created successfully!');
    console.log('Email: admin@rakibul.com');
    console.log('Password: admin123456');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();