const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organizer_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  img_url: {
    type: String,
    required: false
  },
  location_name: {
    type: String,
    required: false
  },
  location_street: {
    type: String,
    required: true
  },
  location_city: {
    type: String,
    required: true
  },
  location_state: {
    type: String,
    required: true
  },
  location_zip: {
    type: String,
    required: true
  },
  cause: {
    type: Schema.Types.ObjectId,
    ref: "Cause"
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
