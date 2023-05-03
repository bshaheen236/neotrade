const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ADMIN, USER } = require("../constants");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    active : {
        type : Boolean,
        required : true,
        default : true
    },
    role: {
        type: String,
        enum: [ADMIN, USER],
        default: USER,
      },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    imagePath:{
        type: String,
        required: true
    },
    bankdetails: [
        {
            name: { type: String, required: true },
            accountnumber: { type: String, required: true },
            ifsc: { type: String, required: true },
            bankname :{type:String, required:true}
        },
    ],
    verifytoken: {
        type: String,
    },
    walletinfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
    },
},
    { timestamps: true },

);

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
})

userSchema.methods.generateUserToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token })
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('User', userSchema);