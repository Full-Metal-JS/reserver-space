var Event = require('./eventModel.js');

module.exports = {
  postEvent: function(req,res){
    new Event({
      eventDate: req.body.eventDate,
      eventToBook: req.body.eventToBook,
      roomName: req.body.roomName,
      eventAlert: req.body.eventAlert
    })
    .save(function(err, doc){
      if(err){
	      res.json(err);
      } else {
        res.send(doc.eventToBook);
      }
    });
  },
  getEvent: function(req,res){
    Event.find(function(err, booked){
      if(err) return console.error(err);
      return res.json(booked);
    });
  }
};