var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/test');

var eventSchema = new Schema({
  eventDate: [Date],
  eventToBook: String,
  eventAlert: Boolean,
  eTime: '',
  roomName: String,
  eventTime: [Date]
});

module.exports = mongoose.model('Event', eventSchema);
