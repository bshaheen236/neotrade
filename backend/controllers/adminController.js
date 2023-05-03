const userModel = require("../models/user.schema");
const transporter = require("../mails/nodemailer");
const saltRounds = 11;
const bcrypt = require("bcrypt")


exports.changePassword = async (req, res) => {
    try {
      const password = req.body.password;
      const newPassword = bcrypt.hashSync(password, saltRounds);
      const user = await userModel.findByIdAndUpdate(
        { _id: req.params.id },
        { password: newPassword },
        { new: true },
      );  res.status(200).send({
        statusCode: 200,
        msg: "user password reset successfully",
        data: user,
      });
  
      if (!user) {
        return res.status(400).send({
          statusCode: 400,
          err: 'user not found',
        });
      }
  
      const mailOption = {
          from : process.env.EMAIL,
          to : user.email,
          subject : " Admin has Change your password",
          text : `Your new password is :- ${password}, Please keep it private`
      }
  
      transporter.sendMail(mailOption, (err) => {
          if(err){
              res.status(400).send({
                  statusCode : 400,
                  err : "Something went wrong"
              })
          }
          else {
              res.status(200).send({
                statusCode: 200,
                msg: "user password changed",
              });
          }
      })
    } catch (err) {
      res.status(400).send({
        statusCode: 400,
        err: 'Something went wrong, please try again',
      });
    }
  };

  exports.newUser = async (req, res) => {
    try {
      const { fname, lname, email, password, phone } = req.body;
      const user = await userModel.findOne({ email }, { email: 1 });
  
      if (user || user !== null) {
        return res.status(400).send({
          statusCode: 400,
          err: "user email already exist",
        });
      }
      const fewUser = new userModel({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        phone: phone,
        imagePath: "immg",
      });
  
      const userRegistered = await fewUser.save();
      res.status(201).send({
        statusCode: 201,
        msg: "user registered successfully",
        data: userRegistered,
      });
    
   
    if (userRegistered) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Admin register your new account",
        text: `Your  register email is :- ${email} And Your current password is:-${password} .Kindly reset your password for security purpose!`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Succsfully" });
        }
      });
    } else {
      res.status(200).send({
        statusCode: 200,
        msg: "sending login mail",
        // userEmail,
        // token: token,
      });
    }
  }
  catch (err) {
      res.status(400).send({ status: 400, err: "Something went wrong" });
    }
  };
  


exports.authorizeUser = async (req, res) => {
    try{
        const {id, status} = req.query;
        console.log(req.query,"queryyyyyyyyyyyy");
        const user = await userModel.findByIdAndUpdate(id, {active : status}, {new : true});
        if(!user){
            return res.status(400).send({
                statusCode : 400,
                err : "user not found"
            })
        }
        if(status == 1){
            res.status(200).send({
                statusCode : 200,
                msg : "user is activated",
                status : status
            })
        }
        else {
            res.status(200).send({
                statusCode : 200,
                msg : "user is deactivated",
                status : status
            })
        }
    }
    catch(err){
      console.log(err,"errrrrrrrrrrr");
        res.status(400).send({
            statusCode : 400,
            err : "Something went wrong, please try again"
        })
    }
}