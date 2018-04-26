const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Date, //is this a string or date type?
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
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
