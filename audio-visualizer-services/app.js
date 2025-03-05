const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://admin_bhavya:MongoAdmin@audio-visualizer.fw6bd.mongodb.net/audio-visualizer?retryWrites=true&w=majority';

// Middleware
app.use(bodyParser.json());

// CORS configuration
const allowedDomain = 'http://localhost:2000';
app.use(cors({
  origin: allowedDomain,
}));

// Routes
app.use('/auth', authRoutes);

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
