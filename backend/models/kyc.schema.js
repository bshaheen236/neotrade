const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  u_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  sName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
  },
  aadharNumber: {
    type: String,
    required: true,
  },
  panCard: {
    type: String,
    required: true,
  },    
  aadImg :{
    type: String,
    required:true,
  },
  panImg :{
    type: String,
    required:true,
  },
  userStatus: {
    type: Boolean,
    default: false,
  },
  adminStatus :{
    type : Boolean,
    default:false,

  }
});

module.exports = mongoose.model('kyc', kycSchema);
