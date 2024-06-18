const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is manadatory"],
    allowNull: true,
  },

  email: {
    type: String,
    required: [true, "email is manadatory"],
    allowNull: false,
  },

  password: {
    type: String,
    required: [true, "password is manadatory"],
    allowNull: false,
  },
  phone: {
    type: String,
    required: [true, "phone is manadatory"],
    allowNull: false,
  },

  role: {
    type: String,
    required: [true, "role is manadatory"],
    allowNull: false,
    default: "user",
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
