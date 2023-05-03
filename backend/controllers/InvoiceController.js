const invoiveModel = require('../models/Invoice.schema');
const transporter = require('../mails/nodemailer');
const PDFDocument = require('pdfkit');
const fs = require("fs");



// define the API endpoint to retrieve an invoice by its invoice number
const recieveInvoice = async (req, res) => {
    const { invoiceNumber } = req.params;

    Invoice.findOne({ invoiceNumber })
        .then((invoice) => {
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found.' });
            }

            res.json(invoice);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error retrieving invoice.', error: err });
        });
};

// get all invoices 
const getUsersInvoices = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    try {
        const results = {};
        results.totalCount = await invoiveModel.countDocuments().exec();

        if (endIndex < results.totalCount) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.current = {
            page: page,
            limit: limit
        }

        results.data = await invoiveModel.find().limit(limit).skip(startIndex).exec();
        const withoutPag = await invoiveModel.find()
        res.status(200).send({
            statusCode: 200,
            results,
            withoutPag 
        });
    }
    catch (err) {
        res.status(400).send({
            'err': 'Users not found',
            'statusCode': 400
        });
    }
}


const sendSellinvoice = async (req, res) => {
    console.log(req.body, "dddddddd");
    const { fullName, UserEmail } = req.body;
    const purchasedItems = req.body.data;

    // calculate the total amount
    let totalAmount = purchasedItems.trade_amount
    const invoiceNumber = Math.floor(Math.random() * 1000000000).toString();
    // create a new invoice document
    const invoice = new invoiveModel({
        invoiceNumber,
        fullName,
        UserEmail,
        purchasedItems,
        totalAmount,
    });
    // save the invoice document to the database
    invoice.save()
        .then(async () => {
            try {
                path = './invoice/file.pdf'
                let doc = new PDFDocument({ size: "A4", margin: 50 });

                generateHeader(doc);
                generateCustomerInformation(doc, invoice);
                generateInvoiceTableSell(doc, invoice);
                generateFooter(doc);

                doc.end();
                doc.pipe(fs.createWriteStream(path));
            }
            catch (error) {
                console.log(error)
            }

            // create a new email message for the invoice
            const mailOptions = {
                from: process.env.EMAIL,
                to: UserEmail,
                subject: `Invoice #${invoiceNumber} of your sell item`,
                text: `Dear ${fullName},\n\nPlease find attached the invoice for your recent sell.\n\nRegards,\nNeoTrade`,
                attachments: [{
                    filename: `invoice-${invoiceNumber}.pdf`,
                    path: './invoice/file.pdf'

                }],
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('Error sending email:', err);
                    res.status(500).send('Error sending email.');
                } else {
                    console.log('Email sent:', info.response);
                    res.send('Invoice created and sent.');
                }
            });
        })

        .catch((err) => {
            res.status(500).json({ message: 'Error creating invoice.', error: err });
        });

};

// define the API endpoint to create a new invoice
const sendBuyinvoice = async (req, res) => {
    const { fullName, UserEmail } = req.body;
    const purchasedItems = req.body.data;

    // calculate the total amount
    let totalAmount = purchasedItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0);

    // calculate the tax 2%
    const tax = (totalAmount * 2) / 100
    // totalAmount += tax
    // generate a random invoice number
    const invoiceNumber = Math.floor(Math.random() * 1000000000).toString();
    // create a new invoice document
    const invoice = new invoiveModel({
        invoiceNumber,
        fullName,
        UserEmail,
        purchasedItems,
        tax,
        totalAmount,
    });
    // save the invoice document to the database
    invoice.save()
        .then(async () => {
            try {
                path = './invoice/file.pdf'
                let doc = new PDFDocument({ size: "A4", margin: 50 });

                generateHeader(doc);
                generateCustomerInformation(doc, invoice);
                generateInvoiceTable(doc, invoice);
                generateFooter(doc);

                doc.end();
                doc.pipe(fs.createWriteStream(path));
            }
            catch (error) {
                console.log(error)
            }

            // create a new email message for the invoice
            const mailOptions = {
                from: process.env.EMAIL,
                to: UserEmail,
                subject: `Invoice #${invoiceNumber} of your buy item`,
                text: `Dear ${fullName},\n\nPlease find attached the invoice for your recent purchase.\n\nRegards,\nNeoTrade`,
                attachments: [{
                    filename: `invoice-${invoiceNumber}.pdf`,
                    path: './invoice/file.pdf'

                }],
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('Error sending email:', err);
                    res.status(500).send('Error sending email.');
                } else {
                    console.log('Email sent:', info.response);
                    res.send('Invoice created and sent.');
                }
            });
        })

        .catch((err) => {
            res.status(500).json({ message: 'Error creating invoice.', error: err });
        });
};

function generateHeader(doc) {
    doc
        .image("./images/logo.png", 50, 50, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("NeoTrade", 110, 57)
        .fontSize(10)
        .text("GOLD & SILVER TRADING", 200, 50, { align: "right" })
        .text("Hinjwadi Phase-3", 200, 65, { align: "right" })
        .text("Pune, Maharastra, 483501", 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;
    doc
        .fontSize(10)
        .text("Invoice Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.invoiceNumber, 150, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(formatDate(new Date()), 150, customerInformationTop + 15)
        .text(invoice.fullName, 350, customerInformationTop)
        .font("Helvetica")
        .text(invoice.UserEmail, 350, customerInformationTop + 15)
        .moveDown();

    generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    doc.fontSize(12).text('Purchased Items:');
    doc.moveDown();
    invoice.purchasedItems.forEach((item) => {
        doc.fontSize(10).text(`${item.category} (${item.quantity} ${item.unit} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)})`);
    });
    doc.moveDown();
    doc.fontSize(12).text(`Total Amount: ${invoice.totalAmount.toFixed(2)}`);
    doc.fontSize(12).text(`Tax: ${invoice.tax.toFixed(2)}`);
    doc.fontSize(12).text(`Grand Total: ${(invoice.totalAmount + invoice.tax).toFixed(2)}`);
    doc.font("Helvetica");
    generateHr(doc, invoiceTableTop + 20);
}

function generateInvoiceTableSell(doc, invoice) {
    const invoiceTableTop = 330;
    doc.font("Helvetica-Bold");
    doc.fontSize(12).text('Sell Items:');
    doc.moveDown();
    invoice.purchasedItems.forEach((item) => {
        doc.fontSize(10).text(`${item.category} (${item.quantity} ${item.unit} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)})`);
    });
    // generateHr(doc, invoiceTableTop + 20);
    doc.moveDown();
    doc.fontSize(12).text(`Total Amount: ${invoice.totalAmount.toFixed(2)}`);
    doc.font("Helvetica");
    generateHr(doc, invoiceTableTop + 20);
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Please Keep this Invoice",
            50,
            780,
            { align: "center", width: 500 }
        );
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + "/" + month + "/" + year;
}


module.exports = {
    sendBuyinvoice,
    sendSellinvoice,
    recieveInvoice,
    getUsersInvoices,
};
