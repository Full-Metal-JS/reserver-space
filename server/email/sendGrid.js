var sendgrid = require('sendgrid')('SENDGRID_API_KEY');

module.exports = {
  signupEmail: function(toEmail) {
    var emailBodyHtml = '<h1>Join Reserver.space</h1>' +
                        '<a href="www.reserver.space">Click here to sign up.</a>';

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
    var emailBodyHtml = '<h1>Check out the new reservation</h1>' +
                        '<a href="www.reserver.space">Click here to sign up.</a>';

    var email = new sendgrid.Email({
      to: toEmail,
      from: 'no-reply@reserver.space',
      subject: 'New Reservation',
      text: emailBodyHtml
    });

    sendgrid.send(email, function(err, json) {
      if(err){
        console.error(err);
      }
    });
  }
};
