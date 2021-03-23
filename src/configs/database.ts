const Sequelize = require("sequelize");
try {
  const sequelize = new Sequelize(
    "cotizador", //db
    "grillo", //user
    "grillo2021", //password
    {
      host: "postgresql-16050-0.cloudclusters.net",
      port: "16050",
      dialect:
        "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      logging: console.log,
    }
  );

  // const sequelize = new Sequelize('mysql://bea408fafdbe8f:d521c44f@us-cdbr-east-02.cleardb.com/heroku_ce6f0f29b65de64?reconnect=true');
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err: any) => {
      console.error("Unable to connect to the database:", err);
    });

  module.exports = sequelize;
} catch (error) {
  console.log(error);
}
