import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;

// Token signing secret key and admin credentials setup
const JWT_SECRET = "nexusflow_super_secret_key_8555892883";
const ADMIN_EMAIL = "admin@nexusflow.com";
const ADMIN_PASSWORD = "Admin@123";

// Middleware Configurations
app.use(cors());
app.use(express.json());

// MongoDB Cloud Atlas Connection String Configuration
const MONGO_URI = "mongodb+srv://Saiuday:8555892883@cluster0.jvjtbzm.mongodb.net/?appName=Cluster0";

// Establish Database Connection (Your exact original database logic)
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Database connected successfully!'))
  .catch((err) => console.error('Database connection failed:', err));

// MongoDB Schema Definitions
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema, 'contacts');

// ---------------------------------------------------------
// Existing Route: Handle Form Submission (POST)
// ---------------------------------------------------------
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ success: true, message: "Thank you for contacting us! Message sent successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------------------------------------------------
// New Route: Admin Authentication Endpoint (POST)
// ---------------------------------------------------------
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ success: true, token, message: "Login successful!" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid email or password!" });
  }
});

// ---------------------------------------------------------
// New Route: Fetch Dashboard Data (GET) - Protected Route with JWT Validation
// ---------------------------------------------------------
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(403).json({ success: false, message: "Access denied! Token missing." });
    }

    jwt.verify(token, JWT_SECRET, async (err: any) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Invalid or expired token." });
      }

      // Query data from Atlas in descending chronological order
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: contacts });
    });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.get('/', (req, res) => {
  res.send('<h1>Welcome to NexusFlow Backend Server!</h1><p>The API is running successfully.</p>');

});
// Initialize Express Server Listening Instance
app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});