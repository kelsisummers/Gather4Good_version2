const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
  eventId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
});

const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = Attendee;
