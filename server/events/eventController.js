var Event = require('./eventModel.js');
var moment = require('moment');

module.exports = {
  postEvent: function(req,res){
    // changing the date to readable format
    var eventDate = moment(req.body.eventDate);
    console.log('req.body in server:', eventDate.format('MM/DD/YYYY'));

    new Event({
      eventDate: eventDate.format('MM/DD/YYYY'),
      eventTime: req.body.eventTime,
      eventDescription: req.body.eventDescription,
      roomName: req.body.roomName,
      houseName: req.body.houseName,
      eventAlert: req.body.eventAlert
    })
    .save(function(err, doc){
      if(err){
	      res.json(err);
      } else {
        res.send(doc.eventDescription);
      }
    });
  },
  getEvent: function(req,res){
    Event.find({})
      .sort({eventDate: -1})
      .exec(function(err, booked){
        console.log(booked);
        if(err) return console.error(err);
        return res.json(booked);
      })
  }
};