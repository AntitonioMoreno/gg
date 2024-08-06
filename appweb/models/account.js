const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    totalggp: {type: Number, default: 0},
}, {_id: false});

const account = new mongoose.Schema({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    user: {type: String},
    password: {type: String},
    wallet: {type: walletSchema, default: () => ({})},
}, { versionKey: false });

module.exports = mongoose.model('account', account);