const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
require('dotenv').config(); // This line reads the .env file

const app = express();
app.use(cors());
app.use(express.json());

const PORT = config.port || 5000;

// 1. Set your MongoDB connection string directly here to bypass environment file issues
let mongoUri = "mongodb://ggolanakondaharish_db_user:oFoG0U88v8LkvCdQ@cluster0-shard-00-00.h0e89fn.mongodb.net:27017,cluster0-shard-00-01.h0e89fn.mongodb.net:27017,cluster0-shard-00-02.h0e89fn.mongodb.net:27017/NovaCart?ssl=true&replicaSet=atlas-d7w8it-shard-0&authSource=admin&retryWrites=true&w=majority";

// 2. Fallback check (only if the string above is empty)
if (!mongoUri) {
  mongoUri = process.env.mongoUri || process.env.MONGO_URI;
}

if (!mongoUri && config.mongoHost) {
  const hostPart = config.mongoHost;
  const isAtlas = hostPart.includes('.mongodb.net') || hostPart.includes('mongodb.net');
  if (isAtlas) {
    mongoUri = `mongodb+srv://${encodeURIComponent(config.mongoUser)}:${encodeURIComponent(config.mongoPass)}@${hostPart}/${config.mongoDbName}?retryWrites=true&w=majority`;
  } else {
    mongoUri = `mongodb://${encodeURIComponent(config.mongoUser)}:${encodeURIComponent(config.mongoPass)}@${hostPart}/${config.mongoDbName}`;
  }
}

// 3. Connect to MongoDB
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err.message || err));
} else {
  console.warn('No MongoDB URI or host configured. Backend will run without database connectivity.');
}

// Routes / Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/products', (req, res) => {
  res.json({ products: [] });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});