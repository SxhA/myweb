const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    doc: { type: String, required: true },
    type: { type: Number, required: true },
    category: { type: Number, required: true },
    date: {type: String, required: true}
})

module.exports = mongoose.model('Article',articleSchema)