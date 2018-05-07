const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
