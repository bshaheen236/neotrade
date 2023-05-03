const Razorpay = require('razorpay');
var crypto = require('crypto');
// create order
exports.orders = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: 'INR', 
    };

    instance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).send({
          statusCode: 500,
          err: 'something went wrong',
        });
      } else {
        return res.status(200).send({
          statusCode: 200,
          data: order,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      err: 'Internal Server Error',
    });
  }
};

// payment verify
exports.verify = async (req, res) => {
  try {
    let body =
      req.body.response.razorpay_order_id +
      '|' +
      req.body.response.razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac('sha256', process.env.KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
      res.status(200).send({
        statusCode: 200,
        msg: 'Sign Valid',
      });
    } else {
      res.status(500).send({
        statusCode: 500,
        err: 'Sign Invalid',
      });
    }
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      err: 'Internal Server Error',
    });
  }
};

exports.paymentDetails = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    await instance.payments.fetch(req.body.razorpay_payment_id).then(order => {
      res.status(200).json({
        success: true,
        data: order,
      });
    });
  } catch (err) {
    res.status(400).send({
      statusCode: '400',
      err: 'something went wrong',
    });
  }
};
