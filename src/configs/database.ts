const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  'cotizador', //db
  'grillo', //user
  'grillo2021', //password
  {
    host: 'postgresql-16050-0.cloudclusters.net',
    port: '16050',
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    // tslint:disable-next-line: no-console
    logging: console.log,
  },
);

sequelize
  .authenticate()
  .then(() => {
    // tslint:disable-next-line: no-console
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    // tslint:disable-next-line: no-console
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
