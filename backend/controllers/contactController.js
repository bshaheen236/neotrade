const contactModel = require('../models/contact');

const getContact = async(req, res) => {
    console.log(req.body)
    try {
        const { fullName, email, phone, message } = req.body;
        contactModel.create({
            fullName: fullName,
            email: email,
            phone: phone,
            message: message
        }).then(data => {
            res.status(200).send({
                "statusCode" : 200,
                'msg' : "data submitted succeefully",
                data
            });
        }).catch(err => res.status(400).json({ 'err': 'something went wrong' }));


    } catch (err) {
        res.status(400).json({ 'err': 'something went wrong' })
    }
}

module.exports = { getContact };