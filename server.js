const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1); // Exit if URI is not set
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if connection fails
  });

// Wallet Schema and Model
const WalletSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  balance: { type: String },
  lastConnected: { type: Date, default: Date.now },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

// Route to save wallet information
app.post("/api/wallet", async (req, res) => {
  const { address, balance } = req.body;
  console.log("Received data from frontend:", { address, balance }); // Log received data

  try {
    let wallet = await Wallet.findOne({ address });
    console.log("Checking if wallet exists:", wallet); // Log if wallet is found or not

    if (!wallet) {
      console.log("Wallet not found. Creating new wallet.");
      wallet = new Wallet({ address, balance });
      await wallet.save();
      console.log("New wallet saved:", wallet);
    } else {
      console.log("Wallet already exists:", wallet); // Log existing wallet
    }

    res.json(wallet);
  } catch (err) {
    console.error("Error saving wallet data:", err); // Log detailed error
    res.status(500).send("Server error");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
