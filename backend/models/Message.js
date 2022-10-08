const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  content: { type: String },
  imageUrl: { type: String },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
  userImage: { type: String, required: true },
  userFirstname: { type: String, required: true },
  userLastname: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Message", messageSchema);
