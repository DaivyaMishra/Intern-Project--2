const mongoose = require('mongoose')

const newSchema = new mongoose.Schema (
    {
      name: String,
      rating: Number,
      since: Number,
      headQuater: String

    },
    
    {timestamps: true}
)

module.exports = mongoose.model('newPublisher', newSchema)