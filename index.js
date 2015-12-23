var app = require('./server/server.js');


var portNo = Number(process.env.PORT || 3000);

app.listen(portNo);

console.log('Server listening on: ', portNo);

