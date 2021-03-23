"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: import-name
const sequelize_1 = __importDefault(require("sequelize"));
// tslint:disable-next-line: import-name
const sequelize = require("../configs/database");
const Model = sequelize_1.default.Model;
class User extends Model {
}
User.init({
    // attributes
    correo: {
        allowNull: false,
        type: sequelize_1.default.STRING,
        unique: true,
    },
    createdAt: {
        allowNull: false,
        defaultValue: sequelize_1.default.NOW,
        type: sequelize_1.default.DATE,
    },
    nombre: {
        allowNull: false,
        type: sequelize_1.default.STRING,
    },
    password: {
        allowNull: false,
        type: sequelize_1.default.STRING,
    },
    rut: {
        allowNull: false,
        type: sequelize_1.default.STRING,
        unique: true,
    },
    saldo: {
        allowNull: false,
        type: sequelize_1.default.INTEGER,
        defaultValue: 0,
    },
}, {
    modelName: "users",
    // tslint:disable-next-line: object-shorthand-properties-first
    sequelize,
});
// User.sync({ alter: true }).then(() => { });
// User.sync({ force: true }).then(() => {});
exports.default = User;
//# sourceMappingURL=User.js.map