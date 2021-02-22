const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    device: { type: String },
    appState: { type: String },
    lat: { type: String },
    lng: { type: String },
    readableTime: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("data", schema, "data");
