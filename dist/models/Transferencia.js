"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: import-name
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require("../configs/database");
const User_1 = __importDefault(require("./User"));
const Model = sequelize_1.default.Model;
class Transferencia extends Model {
}
Transferencia.init({
    // attributes
    amount: {
        allowNull: false,
        type: sequelize_1.default.INTEGER,
    },
    createdAt: {
        allowNull: false,
        defaultValue: sequelize_1.default.NOW,
        type: sequelize_1.default.DATE,
    },
}, {
    modelName: "transferencias",
    sequelize,
});
Transferencia.belongsTo(User_1.default, {
    foreignKey: "destinatario_user",
    constraints: true,
});
Transferencia.belongsTo(User_1.default, {
    foreignKey: "origen_user",
    constraints: true,
});
// Transferencia.sync({ alter: true }).then(() => { });
// Transferencia.sync({ force: true }).then(() => {});
exports.default = Transferencia;
//# sourceMappingURL=Transferencia.js.map