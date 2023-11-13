var mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: 250,
    trim: true,
  },
  details: {
    type: String,
    maxLength: 1000,
    trim: true,
  },
  on: {
    type: Date
  },
  venue: {
    type: String,
    maxLength: 100,
    trim: true,
  },
  registrationLink: {
    type: String,
    maxLength: 250,
    trim: true,
  },
});

module.exports=mongoose.model("Event",eventSchema)