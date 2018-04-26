const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const causeSchema = new Schema({
  name: {
    type: String
  }
});

const Cause = mongoose.model("Cause", causeSchema);

module.exports = Cause;
