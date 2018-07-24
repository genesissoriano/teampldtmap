var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

});

var accounts = mongoose.model("account",AccountSchema);
module.exports = accounts;
