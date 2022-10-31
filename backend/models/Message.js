const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  content: { type: String },
  imageUrl: { type: String },
  usersLiked: { type: [String], required: true },
  userImage: { type: String, required: true },
  userFirstname: { type: String, required: true },
  userLastname: { type: String, required: true },
  comments: {
    type: [
      {
        commenterId: String,
        commenterPseudo: String,
        text: String,
        commenterImage: String,
        timestamp: Number,
      },
    ],
  },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Message", messageSchema);
