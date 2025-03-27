require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Loan Schema & Model
const loanSchema = new mongoose.Schema({
  loanNo: String,
  loanType: String,
  borrower: String,
  borrowerAddress: String,
  coBorrower1Name: String,
  coBorrower1Address: String,
  currentDPD: String,
  sanctionAmount: Number,
  region: String,
});

const Loan = mongoose.model("Loan", loanSchema);

// API to add a new loan
app.post("/api/add-loan", async (req, res) => {
  try {
    const newLoan = new Loan(req.body);
    await newLoan.save();
    res.json(newLoan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to get all loans
app.get("/api/get-loans", async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
