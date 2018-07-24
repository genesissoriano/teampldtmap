var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MarkerSchema = new Schema({
  name: String,
  position: {
      lat: Number,
      lng: Number
  },
  type: String,
  addr: String
});

var Marker = mongoose.model("Marker",MarkerSchema);
module.exports = Marker;
