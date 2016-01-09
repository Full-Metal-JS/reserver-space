var API_KEY = process.env.SEND_GRID || require('./sendGrid-config.js');
var sendgrid = require('sendgrid')(API_KEY);

module.exports = {
  signupEmail: function(toEmail) {
    var emailBodyHtml = 'Join Reserver.space at www.reserver.space';

    var email = new sendgrid.Email({
      to: toEmail,
      from: 'no-reply@reserver.space',
      subject: 'Join Reserver.space!',
      text: emailBodyHtml
    });

    sendgrid.send(email, function(err, json) {
      if(err){
        console.error(err);
      }
    });
  },

  reservationEmail: function(toEmail, reservationDetail) {
    var emailSubject = 'New Reservation at ' + reservationDetail.location + ' in ' +
                       reservationDetail.room;
    var emailBodyHtml = '<html><title></title><body>' +
                        '<h1>New reservation details:</h1>' +
                        '<h3>Location: ' + reservationDetail.location + '</h3>' +
                        '<h3>Room: ' + reservationDetail.room + '</h3>' +
                        '<h3>Title: ' + reservationDetail.reservationName + '</h3>' +
                        '<h3>Start: ' + reservationDetail.start + '</h3>' +
                        '<h3>End: ' + reservationDetail.end + '</h3>' +
                        '<h3>Reserved By: ' + reservationDetail.createdBy + '</h3></body></html>';

    var email = new sendgrid.Email({
      to: toEmail,
      from: 'no-reply@reserver.space',
      subject: emailSubject,
      text: emailBodyHtml
    });

    sendgrid.send(email, function(err, json) {
      if(err){
        console.error(err);
      }
    });
  }
};
