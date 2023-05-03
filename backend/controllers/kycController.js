const kycModel = require("../models/kyc.schema")
exports.postKyc = async (req, res) => {
  try {
    req.body = { ...req.body, u_id: req.params.id, 
      userStatus : true };
      
      const user = await kycModel.findOne({email : req.body.email});
      
    if(user){ 
      return res.status(409).send({
        statusCode : 409,
        err : "kyc form is already registered"
      })
    }
    else{
      await kycModel
        .create(req.body)
        .then(data => {
          res.status(201).send({
            statusCode: 201,
            msg: 'Kyc information is added',
            data,
          });
        })
        .catch(() => {
          res.status(400).send({
            statusCode: 400,
            err: 'something went wrong',
          });
        });
    }
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      err: 'Internal Server Error',
    });
  }
};

exports.getKyc = async (req, res) => {
  try {
    const data = await kycModel.findOne({ u_id: req.params.id });
    if (data === null || !data) {
      res.status(204).send({
        statusCode: 204,
        msg: 'user not found',
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        msg: 'user kyc has been done',
        data
      });
    }
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      err: 'Internal Server Error',
    });
  }
};