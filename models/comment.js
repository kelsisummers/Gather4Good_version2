const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: {
    type: String
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
