const walletModel = require('../models/wallet.schema');
const userModel = require('../models/user.schema');
const PDFDocument = require('pdfkit');
const transporter = require('../mails/nodemailer');
const adminWalletModel = require('../models/adminWalletSchema')
const fs = require("fs");
const mongoose = require('mongoose');

exports.addAmount = async (req, res) => {
  try {
    const user_id = req.params.id;
    console.log(req.body);
    if (!req.body.amount || req.body.amount <= 0) {
      return res.status(400).send({
        statusCode: 400,
        msg: 'amount should not be negative or zero',
      });
    } else {
      await userModel.findById({ _id: req.params.id }).then(data => {
        if (data.walletinfo) {
          data.populate('walletinfo').then(result => {
            const updatedAmount =
              parseInt(result.walletinfo.amount) + parseInt(req.body.amount);
            console.log(updatedAmount, "update");
            const firstData = {
              transactionId: req.body.transactionId,
              amount: req.body.amount,
              paymentMethod: req.body.paymentMethod,
              process: req.body.process,
              name: req.body.name,
              email: req.body.email,
            };
            walletModel
              .updateOne(
                { _id: result.walletinfo._id },
                {
                  $set: { amount: updatedAmount },
                  $push: { transaction: firstData },
                },
              )
              .then(resp => {
                res.status(201).send({
                  statusCode: 201,
                  msg: 'your amount deposited successfully',
                  resp,
                })
                const invoiceNumber = Math.floor(Math.random() * 1000000000).toString();
                const Data = {
                  amount: req.body.amount,
                  process: req.body.process,
                  transactionId: req.body.transactionId,
                  paymentMethod: req.body.paymentMethod,
                  name: req.body.name,
                  email: req.body.email,
                  contact: req.body.contact,
                  invoiceNumber: invoiceNumber
                }
                try {
                  path = './invoice/file.pdf'
                  let doc = new PDFDocument({ size: "A4", margin: 50 });

                  generateHeader(doc);
                  generateCustomerInformation(doc, Data);
                  generateInvoiceTable(doc, Data);
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
                  to: Data.email,
                  subject: `Invoice #${invoiceNumber} of your Deposite amount`,
                  text: `Dear ${Data.name},\n\nPlease find attached the invoice for your recent sell.\n\nRegards,\nNeoTrade`,
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

              });
          });
        }
        else {
          const firstData = {
            transactionId: req.body.transactionId,
            amount: req.body.amount,
            paymentMethod: req.body.paymentMethod,
            process: req.body.process,
            name: req.body.name,
            email: req.body.email,
          };
          walletModel
            .create({
              amount: req.body.amount,
              user_id: user_id,
              transaction: [firstData],
            })
            .then(data => {
              return userModel.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { walletinfo: data._id } },
                { new: true },
              );
            })
            .then(dbProduct => {
              res.status(201).json({
                statusCode: 201,
                msg: 'Your amount deposited successfully',
                dbProduct,
              });
              const invoiceNumber = Math.floor(Math.random() * 1000000000).toString();
              const Data = {
                amount: req.body.amount,
                process: req.body.process,
                transactionId: req.body.transactionId,
                paymentMethod: req.body.paymentMethod,
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                invoiceNumber: invoiceNumber
              }
              try {
                path = './invoice/file.pdf'
                let doc = new PDFDocument({ size: "A4", margin: 50 });

                generateHeader(doc);
                generateCustomerInformation(doc, Data);
                generateInvoiceTable(doc, Data);
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
                to: Data.email,
                subject: `Invoice #${invoiceNumber} of your amount`,
                text: `Dear ${Data.name},\n\nPlease find attached the invoice for your recent sell.\n\nRegards,\nNeoTrade`,
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
            .catch(() => {
              res.status(400).send({
                statusCode: 400,
                err: 'something went wrong, please try again',
              });
            });
        }
      });
    }
  } catch (err) {
    console.log(err, "hnnnnerr");
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong',
    });
  }
};

exports.viewAmount = async (req, res) => {
  try {
    await userModel
      .findById({ _id: req.params.id })

      .populate('walletinfo')
      .then(data => {
        res.status(200).send({
          statusCode: 200,
          data
        });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
          err: 'User wallet is empty',
        });
      });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong',
    });
  }
};

exports.withdrawAmount = async (req, res) => {

  try {
    if (!req.body.amount || req.body.amount <= 0) {
      return res.status(400).send({
        statusCode: 400,
        msg: 'amount should not be negative or zero',
      });
    }
    else {
      await userModel
        .findById({ _id: req.params.id })
        .populate('walletinfo')
        .then(data => {
          if (
            parseInt(data.walletinfo.amount) - parseInt(req.body.amount) <
            1000
          ) {
            res.status(400).send({
              statusCode: 400,
              err: 'Insufficient balance',
            });
          } else {
            const amount =
              parseInt(data.walletinfo.amount) - parseInt(req.body.amount);

            const firstData = {
              transactionId: req.body.transactionId,
              amount: req.body.amount,
              paymentMethod: req.body.paymentMethod,
              process: req.body.process,
              bankName: req.body.bankName,
              name: req.body.name,
              email: req.body.email,
            };

            walletModel
              .updateOne(
                { _id: data.walletinfo._id },
                { $set: { amount }, $push: { transaction: firstData } },
              )
              .then(result => {
                const invoiceNumber = Math.floor(Math.random() * 1000000000).toString();
                const Data = {
                  amount: req.body.amount,
                  name: req.body.name,
                  email: req.body.email,
                  bankName: req.body.bankName,
                  transactionId: req.body.transactionId,
                  paymentMethod: req.body.paymentMethod,
                  invoiceNumber: invoiceNumber
                }
                try {
                  path = './invoice/file.pdf'
                  let doc = new PDFDocument({ size: "A4", margin: 50 });

                  generateHeader(doc);
                  generateCustomerInformation(doc, Data);
                  generateInvoiceTable2(doc, Data);
                  generateFooter(doc);

                  doc.end();
                  doc.pipe(fs.createWriteStream(path));
                }
                catch (error) {
                  console.log(error)
                }

                const mailOption = {
                  from: process.env.EMAIL,
                  to: req.body.email,
                  subject: `Invoice #${invoiceNumber} of your Deposite amount`,
                  // text : `Hii ${req.body.name}, Amount ${req.body.amount} credited to your bank account (${req.body.bankName}) from your wallet`,
                  text: `Dear ${Data.name},\n\nPlease find attached the invoice for your recent sell.\n\nRegards,\nNeoTrade`,
                  attachments: [{
                    filename: `invoice-${invoiceNumber}.pdf`,
                    path: './invoice/file.pdf'

                  }],
                }

                transporter.sendMail(mailOption, (err, info) => {
                  if (err) {
                    res.status(400).send({
                      statusCode: 400,
                      err: "something went wrong, mail is not sent"
                    })
                  }
                  else {
                    res.status(201).send({
                      statusCode: 201,
                      msg: `You withdrawn ${req.body.amount} successfully`,
                      result,
                    });
                  }
                })

              })
              .catch(() => {
                res.status(400).send({
                  statusCode: 400,
                  err: 'Something went wrong, balance is not updated',
                });
              });
          }
        })
        .catch(() => {
          res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
          });
        });
    }
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong',
    });
  }
};


exports.getWalletTransaction = async (req, res) => {
  try {
    const userWalletID = await userModel.findById({ _id: req.query.id });
    const allTransaction = await userWalletID.populate("walletinfo");

    if (allTransaction.walletinfo === undefined) {
      return res.status(203).send({
        statusCode: 203,
        msg: "No transaction yet"
      })
    }
    const transactionLength = allTransaction.walletinfo.transaction;
    console.log(transactionLength, "transactionLength");

    const id = userWalletID.walletinfo;
    let { page_no, page_limit } = req.query;

    page_limit = Number(page_limit);
    const objId = mongoose.Types.ObjectId(id);
    const transactionData = await walletModel.aggregate([
      {
        $match: {
          _id: objId,
        },
      },
      {
        $project: {
          transaction: 1,
          _id: 0,
        },
      },
      {
        $unwind: '$transaction',
      },
      {
        $skip: (page_no - 1) * page_limit,
      },
      {
        $limit: page_limit,
      },
    ]);;
    res.status(200).send({
      statusCode: 200,
      transactionData,
      length: transactionLength.length

    }
    );
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong, please try again',
    });
  }
};

exports.walletExport = async (req, res) => {
  try {
    const transactions = await walletModel.aggregate([
      {
        $project: {
          transaction: 1,
        },
      },
      {
        $unwind: '$transaction',
      }
    ]);;
    let { page_no, page_limit } = req.query;

    page_limit = Number(page_limit);

    const transactionData = await walletModel.aggregate([
      {
        $project: {
          transaction: 1,
        },
      },
      {
        $unwind: '$transaction',
      },
      {
        $skip: (page_no - 1) * page_limit,
      },
      {
        $limit: page_limit,
      },
    ]);;
    res.status(200).send({
      statusCode: 200,
      Transactions: { transactionData },
      length: transactions.length,
      withoutPagination: transactions

    }
    );
    console.log(transactionData, "hnnnn");
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong, please try again',
    });
    console.log(err);
  }
};

exports.buyAmount = async (req, res) => {
  try {
    // calculate the tax 2%
    const tax = (req.body.totalPrice * 2) / 100
    if (!req.body.totalPrice || req.body.totalPrice <= 0) {
      return res.status(400).send({
        statusCode: 400,
        msg: 'amount should not be negative or zero',
      });
    } else {
      await userModel
        .findById({ _id: req.params.id })
        .populate('walletinfo')
        .then(data => {
          // console.log(data.walletinfo, "then ka responce");
          const amount =
            parseInt(data.walletinfo.amount) - (parseInt((req.body.totalPrice) + tax));

          walletModel
            .updateOne(
              { _id: data.walletinfo._id },
              { $set: { amount } },
            )
            .then(async (result) => {
              await adminWalletModel.updateOne({
                $inc: { amount: tax }
              })

              res.status(201).send({
                statusCode: 201,
                msg: `You item buy successfully`,
                result,
              });
              // console.log(result, "result ka responce");
            })
            .catch(() => {
              res.status(400).send({
                statusCode: 400,
                err: 'Something went wrong',
              });
            });

        })
        .catch(() => {
          res.status(400).send({
            statusCode: 400,
            err: 'Something went wrongG',
          });
        });
    }
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong',
    });
  }
}

exports.sellAmount = async (req, res) => {
  try {
    if (!req.body.amount || req.body.amount <= 0) {
      return res.status(400).send({
        statusCode: 400,
        msg: 'amount should not be negative or zero',
      });
    } else {
      await userModel
        .findById({ _id: req.params.id })
        .populate('walletinfo')
        .then(data => {
          const amount =
            parseInt(data.walletinfo.amount) + parseInt(req.body.amount);

          walletModel
            .updateOne(
              { _id: data.walletinfo._id },
              { $set: { amount } },
            )
            .then(result => {
              res.status(201).send({
                statusCode: 201,
                msg: `You item buy successfully`,
                result,
              });
            })
            .catch(() => {
              res.status(400).send({
                statusCode: 400,
                err: 'Something went wrongG',
              });
            });

        })
        .catch(() => {
          res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
          });
        });
    }
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong',
    });
  }
}

exports.viewAdminWallet = async (req, res) => {
  try {
    await adminWalletModel.findOne()
      .then(data => {
        res.status(200).send({
          statusCode: 200,
          data
        });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
          err: 'Admin wallet is empty',
        });
      });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong',
    });
  }
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

function generateCustomerInformation(doc, Data) {
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
    .text(Data.invoiceNumber, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text(Data.name, 350, customerInformationTop)
    .font("Helvetica")
    .text(Data.email, 350, customerInformationTop + 15)

    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, Data) {
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  doc.fontSize(12).text('Deposit Trasection Details:');

  doc.moveDown()
    .font("Helvetica")
  doc.fontSize(10).text(`Transection Id: ${Data.transactionId}`);
  doc.fontSize(10).text(`payment method : ${Data.paymentMethod}`);
  doc.fontSize(10).text(`Amount : ${Data.amount}`);
  doc.font("Helvetica");
  generateHr(doc, invoiceTableTop + 20);
}
function generateInvoiceTable2(doc, Data) {
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  doc.fontSize(12).text('Withdrow Trasection Details:');

  doc.moveDown()
    .font("Helvetica")
  doc.fontSize(10).text(`Transection Id: ${Data.transactionId}`);
  doc.fontSize(10).text(`payment method : ${Data.paymentMethod}`);
  doc.fontSize(10).text(`Your Bank is: ${Data.bankName}`);
  doc.fontSize(10).text(`Amount : ${Data.amount}`);
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
