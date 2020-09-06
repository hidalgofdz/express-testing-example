const {spawn} = require('child_process');
const spawnOptions = {stdio: 'inherit'};

async function createDatabase() {
  // Our database URL
  return new Promise((resolve, reject) => {
    // Migrate the DB
    const dropCommand = spawn('./node_modules/.bin/sequelize', ['db:create'], spawnOptions);

    dropCommand.on('close', (exitCode) => {
      console.log('*************************');
      if (exitCode === 0) {
        console.log('Creating database successful');
        resolve()
        return
      }
      console.log('Creating failed');
      reject(new Error('Something when wrong while creating the database'));
    })
  });
}

module.exports = createDatabase;
