const {truncate } = require('../db-utils');

beforeEach(async () => {
  await truncate()
})
