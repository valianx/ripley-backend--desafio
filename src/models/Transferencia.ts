// tslint:disable-next-line: import-name
import Sequelize from "sequelize";
const sequelize = require("../configs/database");
import User from "./User";

const Model = Sequelize.Model;

class Transferencia extends Model {
  dataValues: any;
}
Transferencia.init(
  {
    // attributes
    amount: {
      allowNull: false,
      type: Sequelize.NUMBER,
    },
    createdAt: {
      allowNull: false,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE,
    },
  },
  {
    modelName: "transferencias",
    sequelize,
  }
);

Transferencia.belongsTo(User, {
  foreignKey: "destinatario_user",
  constraints: true,
});

Transferencia.belongsTo(User, {
  foreignKey: "origen_user",
  constraints: true,
});

// Transferencia.sync({ alter: true }).then(() => { });
// Transferencia.sync({ force: true }).then(() => {});

export default Transferencia;
