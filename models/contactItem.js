const mongoose = require("mongoose")

const Schema = mongoose.Schema
const contactItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ContactItem = mongoose.model("contactData", contactItemSchema)
module.exports = ContactItem