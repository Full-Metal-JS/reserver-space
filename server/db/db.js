const pg = require('pg-rxjs');

require('dotenv').config();

const connectionString = `${process.env.DATABASE_URL}?ssl=true`;

const client = new pg.Pool(connectionString);

module.exports = client;
