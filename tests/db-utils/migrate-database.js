const {spawn} = require('child_process');
const spawnOptions = {stdio: 'inherit'};

async function runMigrations() {
  // Our database URL
  return new Promise((resolve, reject) => {
    // Migrate the DB
    const dropCommand = spawn('./node_modules/.bin/sequelize', ['db:migrate'], spawnOptions);

    dropCommand.on('close', (exitCode) => {
      console.log('*************************');

      if (exitCode === 0) {
        console.log('Database migration successful');
        resolve()
        return
      }
      console.log(exitCode);
      console.log('Migrations failed');
      reject(new Error('Something when wrong while running migrations'));
    })
  });
}

module.exports = runMigrations;
