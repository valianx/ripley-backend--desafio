// tslint:disable-next-line: import-name
import Sequelize from "sequelize";
// tslint:disable-next-line: import-name
const sequelize = require("../configs/database");

const Model = Sequelize.Model;

class User extends Model {
  dataValues: any;
}
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
    saldo: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    modelName: "users",
    // tslint:disable-next-line: object-shorthand-properties-first
    sequelize,
    // options
  }
);

// User.sync({ alter: true }).then(() => { });
// User.sync({ force: true }).then(() => {});

export default User;
