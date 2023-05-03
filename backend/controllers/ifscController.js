const ifsc = require('ifsc');
exports.getBankDetails = async (req, res) => {
  try {
    ifsc
      .fetchDetails(req.body.ifsc)
      .then(function (data) {
        res.status(200).send(data.BANK);
      })
      .catch(() => {
        res.status(400).send({ statusCode: 400, err: 'Something went wrong' });
      });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      err: 'Internal Server Error',
    });
  }
};
