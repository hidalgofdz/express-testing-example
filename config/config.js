module.exports = {
  development: {
    username: "hidalgofdz",
    password: null,
    database: "express-example_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_USER || "hidalgofdz",
    password: process.env.POSTGRES_PASSWORD || null,
    database: "express-example_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "hidalgofdz",
    password: null,
    database: "express-example_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
