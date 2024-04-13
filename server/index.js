// Example backend logic for user signup
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('user', userSchema);

// Signup endpoint
app.post('/', (req, res) => {
  const { name, email, password } = req.body;
  
  // Create new user
  const newUser = new User({ name, email, password });
  
  // Save user to database
  newUser.save((err, savedUser) => {
    if (err) {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Failed to save user' });
    } else {
      console.log('User created successfully:', savedUser);
      res.status(200).json({ message: 'User created successfully', user: savedUser });
    }
  });
});

// Start server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});