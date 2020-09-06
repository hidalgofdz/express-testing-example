module.exports = {
  setupFilesAfterEnv: [
    "./tests/jest-runner-config/before-each-truncate-database",
  ],
  globalSetup: "./tests/jest-runner-config/setup",
  globalTeardown: "./tests/jest-runner-config/teardown",
};
