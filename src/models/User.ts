// tslint:disable-next-line: import-name
import Sequelize from 'sequelize';
// tslint:disable-next-line: import-name
import sequelize from '../configs/database';

const Model = Sequelize.Model;

class User extends Model {}
User.init(
  {
    // attributes
    correo: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE,
    },
    nombre: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    rut: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
  },
  {
    modelName: 'users',
    // tslint:disable-next-line: object-shorthand-properties-first
    sequelize,
    // options
  },
);

// User.sync({ alter: true }).then(() => { });
// User.sync({ force: true }).then(() => {});

export default User;
