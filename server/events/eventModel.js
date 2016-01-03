var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  eventDate: Date,
  eventDescription: String,
  eventAlert: Boolean,
  roomName: String,
  houseName: String,
  eventTime: Date
});

module.exports = mongoose.model('Event', eventSchema);
