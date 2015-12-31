// TODO: db schema

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Event = mongoose.model('Event', new Schema({
	eventDate: [Date],
	//6 do we need a seperate key/val for time?
  eventToBook: String,
  roomName: String,
  eventAlert: Boolean 
}));

//6 export this?