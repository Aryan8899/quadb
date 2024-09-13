//new

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

// Define the Wallet schema and model
const WalletSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  balance: { type: String },
  lastConnected: { type: Date, default: Date.now },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

// API endpoint to handle wallet data
app.post("/api/wallet", async (req, res) => {
  console.log("Received request body:", req.body);

  const { address, balance } = req.body;

  // Validate request body
  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    let wallet = await Wallet.findOne({ address });
    console.log("Checking if wallet exists:", wallet);

    if (!wallet) {
      console.log("Wallet not found. Creating new wallet.");
      wallet = new Wallet({ address, balance });
      await wallet.save();
      console.log("New wallet saved:", wallet);
    } else {
      console.log("Wallet already exists:", wallet);
    }

    res.json(wallet);
  } catch (err) {
    console.error("Error saving wallet data:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Start the server (if running this file directly)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express application
module.exports = app;
