var Event = require('./eventModel.js');
module.exports = {
  postEvent: function(req,res){
    new Event({
      eventDate: req.body.eventDate,
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
      });
  }
};
