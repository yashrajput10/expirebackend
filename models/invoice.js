const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  invoiceDate: Date,
  itemName: String,
  price: Number,
  expiryDate: Date,
  done: { type: Boolean, default: false }, // Added field for "done" status
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
