const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URL (from environment variable)
const mongoURI = process.env.MONGO_URI + "?connectTimeoutMS=10000&socketTimeoutMS=10000";


// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if the connection fails
  });

// Use Routes
app.use("/invoices", invoiceRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
