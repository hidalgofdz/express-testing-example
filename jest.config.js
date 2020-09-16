module.exports = {
  setupFilesAfterEnv: [
    "./tests/jest-runner-config/before-each-truncate-database",
  ],
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/tests",
    "<rootDir>/migrations",
    "<rootDir>/coverage",
    "<rootDir>/bin",
    "<rootDir>/public",
    "<rootDir>/factories",
  ],
  collectCoverageFrom: ["**/*.{js,jsx}"],
  globalSetup: "./tests/jest-runner-config/setup",
  globalTeardown: "./tests/jest-runner-config/teardown",
};
