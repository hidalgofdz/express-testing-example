const models = require("../../models");

async function truncate() {
  return await Promise.all(
    Object.keys(models).map((key) => {
      if (["sequelize", "Sequelize"].includes(key)) return null;
      return models[key].destroy({
        where: {},
        force: true,
        truncate: true,
        restartIdentity: true,
      });
    })
  );
}

module.exports = truncate;
