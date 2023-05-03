const userModel = require('../models/user.schema');

exports.addBank = async (req, res) => {
  try {
    const body = req.body;
    await userModel
      .findById({ _id: req.params.id })
      .then(user => {
        user.bankdetails.push(body);
        return user
          .save()
          .then(() => {
            res.status(201).send({
              statusCode: 201,
              msg: 'bank details added successfully',
            });
          })
          .catch(() => {
            res.status(400).send({
              statusCode: 400,
              err: 'something went wrong',
            });
          });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
          err: 'user not found',
        });
      });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      err: 'something went wrong',
    });
  }
};

exports.getBankDetails = async (req, res) => {
  try {
    await userModel
      .findById(req.params.id)
      .then(user => {
        res.status(200).send({
          statusCode: 200,
          msg: 'user bank accounts',
          accounts: user.bankdetails,
        });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
          err: 'something went wrong',
        });
      });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      err: 'something went wrong',
    });
  }
};

exports.deleteBank = async (req, res) => {
  try {
    await userModel
      .findById(req.params.id)
      .then(user => {
        user.bankdetails = user.bankdetails.filter(item => {
          return item._id != req.params.accId;
        });
        user.save().then(result => {
          res.status(200).send({
            statusCode: 200,
            msg: 'user account deleted',
            result,
          });
        });
      })
      .catch(() => {
        res.status(200).send({
          statusCode: 200,
          err: 'something went wrong',
        });
      });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'something went wrong',
    });
  }
};
