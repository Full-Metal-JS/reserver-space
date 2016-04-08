const server = require('./config/server-config');
require('dotenv').config();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
