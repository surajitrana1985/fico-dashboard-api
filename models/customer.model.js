const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    customerId: {
        type: Number,
        required: true,
        index: true
    },
    customerName: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true,
        index: true
    },
    qualification: {
        type: String,
        required: true,
        index: true
    },
    income: {
        type: Number,
        required: true,
        index: true
    },
    workExp: {
        type: Number,
        required: true,
        index: true
    },
    numHouseholds: {
        type: Number,
        required: true,
        index: true
    },
    region: {
        type: String,
        required: true,
        index: true
    },
    state: {
        type: String,
        required: true,
        index: true
    },
    address: {
        type: String,
        required: true,
        index: true
    },
    accountBalance: {
        type: Number,
        required: true,
        index: true
    },
    relationshipTenure: {
        type: Number,
        required: true,
        index: true
    },
    numAccounts: {
        type: Number,
        required: true,
        index: true
    },
    accountType: {
        type: String,
        required: true,
        index: true
    },
    employmentStatus: {
        type: String,
        required: true,
        index: true
    }
});

module.exports = mongoose.model('Customer', customerSchema);
