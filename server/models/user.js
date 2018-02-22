const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    mobile: String,
    pass: String
})

module.exports = mongoose.model('User',userSchema)