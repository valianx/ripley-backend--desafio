import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'd4ppm8brkpqat', // db
  'dstsyphnmdoreh', // user
  'e0c7c093efd490ab8bdd674ba7b6c11701f0767bf55ceaa1bb26dd9815a0e476', // password
  {
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    host: 'ec2-18-214-208-89.compute-1.amazonaws.com',
    // tslint:disable-next-line: no-console
    logging: console.log,
    port: 16050,
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

export default sequelize;
