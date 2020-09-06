const truncate = require("./truncate-database");
const dropDatabase = require("./drop-database");
const createDatabase = require("./create-database");
const runMigrations = require("./migrate-database");

module.exports = {
  runMigrations,
  createDatabase,
  dropDatabase,
  truncate,
};
