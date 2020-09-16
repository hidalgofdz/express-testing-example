require("dotenv").config();
const { truncate, runMigrations } = require("../db-utils");

module.exports = async () => {
  await truncate();
  await runMigrations();
};
