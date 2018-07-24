var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SubscriberSchema = new Schema({
  sip_no: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  addr: String,
  lcpnap: String,
  port: String,
  package: String,
  d_installed: String
});

var Subscriber = mongoose.model("Subscriber", SubscriberSchema);
module.exports = Subscriber;
