const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.post("/", invoiceController.createInvoice);
router.get("/", invoiceController.getInvoices);
router.delete("/:id", invoiceController.deleteInvoice);
router.put("/:id/done", invoiceController.toggleDoneStatus);

module.exports = router;
