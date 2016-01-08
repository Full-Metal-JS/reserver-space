var app = require('./server-config.js');
var models = require('./db/models');

var port = process.env.PORT || 3000;
app.set('port', port);

models.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log('server running on port: ', port);
  });
});
