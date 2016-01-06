var sendgrid = require('sendgrid')('SENDGRID_API_KEY');

module.exports = {
  signupEmail: function(toEmail, fromEmail) {
    var email = new sendgrid.Email({
      to: toEmail,
      from: fromEmail,
      subject: 'Join Reserver!',
      text: 'This is a test'
    });

    sendgrid.send(email, function(err, json) {
      if(err){
        console.error(err);
      }
    });
  },

  reservationEmail: function(toEmail, fromEmail) {
    var email = new sendgrid.Email({
      to: toEmail,
      from: fromEmail,
      subject: 'New Reservation!',
      text: 'This is a test'
    });

    sendgrid.send(email, function(err, json) {
      if(err){
        console.error(err);
      }
    });
  }
};
