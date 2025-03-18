const Invoice = require("../models/invoice");
const { formatDate, isExpiringSoon } = require("../utils/dateUtils");

const createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, invoiceDate, itemName, price, expiryDate } = req.body;

    // Ensure that the dates are valid before saving
    const formattedInvoiceDate = new Date(invoiceDate);
    const formattedExpiryDate = new Date(expiryDate);

    if (isNaN(formattedInvoiceDate) || isNaN(formattedExpiryDate)) {
      return res.status(400).send({ message: "Invalid date format." });
    }

    const invoice = new Invoice({
      invoiceNumber,
      invoiceDate: formattedInvoiceDate,
      itemName,
      price,
      expiryDate: formattedExpiryDate,
    });

    await invoice.save();
    res.send(invoice);
  } catch (error) {
    res.status(500).send({ message: "Error creating invoice", error: error.message });
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    // Format the dates before sending to the frontend
    const formattedInvoices = invoices.map((invoice) => ({
      ...invoice.toObject(),
      invoiceDate: formatDate(invoice.invoiceDate),
      expiryDate: formatDate(invoice.expiryDate),
    }));

    // Sort invoices with the ones expiring soon on top
    formattedInvoices.sort((a, b) => {
      const aIsExpiringSoon = isExpiringSoon(a.expiryDate);
      const bIsExpiringSoon = isExpiringSoon(b.expiryDate);

      if (aIsExpiringSoon && !bIsExpiringSoon) return -1;
      if (!aIsExpiringSoon && bIsExpiringSoon) return 1;

      return 0;
    });

    res.send(formattedInvoices);
  } catch (error) {
    res.status(500).send({ message: "Error fetching invoices", error: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.send({ message: "Invoice deleted" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting invoice", error: error.message });
  }
};

const toggleDoneStatus = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).send({ message: "Invoice not found" });

    invoice.done = !invoice.done;  // Toggle the done status
    await invoice.save();
    res.send(invoice);
  } catch (error) {
    res.status(500).send({ message: "Error updating invoice status", error: error.message });
  }
};

module.exports = { createInvoice, getInvoices, deleteInvoice, toggleDoneStatus };
