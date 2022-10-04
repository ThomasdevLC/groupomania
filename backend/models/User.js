const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  imageUrl: {
    type: String,
    default:
      " https://i2.wp.com/www.cycat.io/wp-content/uploads/2018/10/Default-user-picture.jpg",
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
