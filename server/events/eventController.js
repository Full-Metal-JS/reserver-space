var eventModel = require('./eventModel.js');
var Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));

module.exports = {
  postEvent: function(req,res){
    //checks if event already exists
    eventModel.findOne({ 
      'eventDate': req.body.dibEvent.eventDate,
      'roomName': req.body.dibEvent.roomName
    }).then(function(result){
      if(result){
        res.json({ result: false });
      } else {
        var storeEvent = eventModel.create.bind(eventModel);
        storeEvent(req.body.dibEvent);
        res.json({ result: true });
      }
    });
  },

  getEvent: function(req,res){
    eventModel.find({})
      .sort({eventDate: 1})
      .then(function(booked){
        return res.json(booked);
      });
  }
};
