const goldModel = require('../models/gold.schema');
const silverModel = require('../models/silver.schema');

exports.postGold = async (req, res) => {
  try {
    await goldModel
      .create(req.body)
      .then(() => {
        res.status(201).send({
          statusCode: 201,
          msg: 'Data added successfully',
        });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
          err: 'something went wrong',
        });
      });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong',
    });
  }
};

exports.getGold = async (req, res) => {
  try {
    await goldModel
      .find()
      .then(data => {
        res.status(200).send({
          statusCode: 200,
          msg: 'Data of gold fetch successfully',
          data,
        });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
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

exports.postSilver = async (req, res) => {
  try {
    await silverModel
      .create(req.body)
      .then(() => {
        res.status(201).send({
          statusCode: 201,
          msg: 'Data added successfully',
        });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
          err: 'something went wrong',
        });
      });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      err: 'Something went wrong',
    });
  }
};

exports.getSilver = async (req, res) => {
  try {
    await silverModel
      .find()
      .then(data => {
        res.status(200).send({
          statusCode: 200,
          msg: 'Data of silver fetch successfully',
          data,
        });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
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

exports.getGoldPrice = async (req, res) => {
  try {
    await goldModel
      .find()
      .then(result => {
        const high = [];
        const low = [];
        for (let i of result) {
          high.push(parseFloat(i.high));
          low.push(parseFloat(i.low));
        }
        res.status(200).send({
          data: {
            high,
            low,
          },
        });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
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

exports.getSilverPrice = async (req, res) => {
  try {
    await silverModel
      .find()
      .then(result => {
        const high = [];
        const low = [];
        for (let i of result) {
          high.push(parseFloat(i.high));
          low.push(parseFloat(i.low));
        }
        res.status(200).send({
          data: {
            high,
            low,
          },
        });
      })
      .catch(() => {
        res.status(400).send({
          statusCode: 400,
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

exports.updateGold = async (req, res) => {
  try{
    const {gold_18_karat, gold_22_karat, gold_24_karat} = req.body;
    await goldModel.updateOne({_id : req.params.id}, {$set: {gold_18_karat, gold_22_karat, gold_24_karat}})
      .then(result => {
        res.status(201).send({
          'statusCode' : 201,
          'msg' : 'updated....',
          result
        })
      })
      .catch(() => {
        res.status(400).send({
          'statusCode' : 400,
          'err' : 'something went wrong'
        })
      })
  }
  catch(err){
    res.status(500).send({
      'statusCode' : 500,
      'err' : 'something went wrong'
    })
  }
}

// exports.updateSilver = async (req, res) => {
//   try{
//     const {gold_18_karat, gold_22_karat, gold_24_karat} = req.body;
//     await goldModel.updateOne({_id : req.params.id}, {$set: {gold_18_karat, gold_22_karat, gold_24_karat}})
//       .then(result => {
//         res.status(201).send({
//           'statusCode' : 201,
//           'msg' : 'updated....',
//           result
//         })
//       })
//       .catch(() => {
//         res.status(400).send({
//           'statusCode' : 400,
//           'err' : 'something went wrong'
//         })
//       })
//   }
//   catch(err){
//     res.status(500).send({
//       'statusCode' : 500,
//       'err' : 'something went wrong'
//     })
//   }
// }