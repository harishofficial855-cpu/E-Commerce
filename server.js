const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const config = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || config.port || 5000;

// MongoDB URI
let mongoUri = process.env.MONGO_URI || process.env.mongoUri || "";

if (!mongoUri && config.mongoHost) {
  const isAtlas =
    config.mongoHost.includes("mongodb.net") ||
    config.mongoHost.includes(".mongodb.net");

  if (isAtlas) {
    mongoUri = `mongodb+srv://${encodeURIComponent(
      config.mongoUser
    )}:${encodeURIComponent(config.mongoPass)}@${
      config.mongoHost
    }/${config.mongoDbName}?retryWrites=true&w=majority`;
  } else {
    mongoUri = `mongodb://${encodeURIComponent(
      config.mongoUser
    )}:${encodeURIComponent(config.mongoPass)}@${
      config.mongoHost
    }/${config.mongoDbName}`;
  }
}

// MongoDB Connection
if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Error:", err.message));
} else {
  console.log("⚠️ No MongoDB URI found");
}

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/products", (req, res) => {
  res.json({
    products: [
      { id: 1, name: "Laptop" },
      { id: 2, name: "Phone" },
      { id: 3, name: "Headphones" }
    ]
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "API Running Successfully" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
