const { spawn } = require("child_process");
const spawnOptions = { stdio: "inherit" };

async function dropDatabase() {
  // Our database URL
  return new Promise((resolve, reject) => {
    // Migrate the DB
    const dropCommand = spawn(
      "./node_modules/.bin/sequelize",
      ["db:drop"],
      spawnOptions
    );

    dropCommand.on("close", (exitCode) => {
      // Oh no!
      if (exitCode === 0) {
        console.log("*************************");
        console.log("Dropping database successful");
        resolve();
        return;
      }
      console.log("*************************");
      console.log("Dropping failed");
      reject(new Error("Something when wrong while dropping the database"));
    });
  });
}

module.exports = dropDatabase;
