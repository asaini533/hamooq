const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    image: { type: String },
    phnNumber: { type: Number },
    gender: { type: String },
    address: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
