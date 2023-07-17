const mongoose = require('mongoose');
const { states } = require('../utils/states');

const addressSchema = new mongoose.Schema({
    street1: {
        type: String,
        required: true,
    },
    street2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: states,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
});

const additionalFieldSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
})

const patientSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true,
    },
    middleName: { 
        type: String,
    },
    lastName: { 
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    address: [addressSchema],
    additionalFields: [additionalFieldSchema],
});

module.exports = mongoose.model('Patient', patientSchema);