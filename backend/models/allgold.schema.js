const mongoose = require('mongoose');

const goldSchema = new mongoose.Schema({
    Jan: [{ price: { type: String, required: true } }],
    Feb: [{ price: { type: String, required: true } }],
    Mar: [{ price: { type: String, required: true } }],
    Apr: [{ price: { type: String, required: true } }],
    May: [{ price: { type: String, required: true } }],
    Jun: [{ price: { type: String, required: true } }],
    Jul: [{ price: { type: String, required: true } }],
    Aug: [{ price: { type: String, required: true } }],
    Sep: [{ price: { type: String, required: true } }],
    Oct: [{ price: { type: String, required: true } }],
    Nov: [{ price: { type: String, required: true } }],
    Dec: [{ price: { type: String, required: true } }]
})

module.exports = mongoose.model('gold', goldSchema);