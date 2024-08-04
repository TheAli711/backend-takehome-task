const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: String,
    data: String,
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", docSchema);

module.exports = { Document };
