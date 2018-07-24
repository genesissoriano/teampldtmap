var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports.connect = function() {
	mongoose.connect('mongodb://mdfadmin:pldtsflu1122@ds131531.mlab.com:31531/pldtdb');
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return db;
}