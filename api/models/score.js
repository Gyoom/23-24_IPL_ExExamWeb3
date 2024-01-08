const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

// Define Schema
const scoreSchema = new mongoose.Schema({
  username: String,
  date: Date,
  score: Number,
  joke: ObjectId

})

scoreSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export model
module.exports = mongoose.model('Score', scoreSchema)