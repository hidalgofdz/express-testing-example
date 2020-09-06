require('dotenv').config();
const startServer = require('../../start');
const {truncate, runMigrations} = require('../db-utils')

module.exports = async () => {
  await truncate();
  await runMigrations();
  server = await startServer();

  global.server = server;
}
