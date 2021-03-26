const Sequelize = require("sequelize");
try {
  const sequelize = new Sequelize(
    "d4ppm8brkpqat", //db
    "dstsyphnmdoreh", //user
    "e0c7c093efd490ab8bdd674ba7b6c11701f0767bf55ceaa1bb26dd9815a0e476", //password
    {
      host: "ec2-18-214-208-89.compute-1.amazonaws.com",
      port: "5432",
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
