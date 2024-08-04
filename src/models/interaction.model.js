const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
  {
    docId: {
      type: Number,
      required: true,
    },
    like: Boolean,
    dislike: Boolean,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Interaction = mongoose.model("Interaction", interactionSchema);

module.exports = { Interaction };
