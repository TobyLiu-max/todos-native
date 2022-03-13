const mongoose = require('mongoose')

const { Schema, model } = mongoose

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false,
    default: false
  }
}, {
  timestamps: true
})

module.exports = model('Native-todo', schema)
