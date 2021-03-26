"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const loginUtils_1 = require("../utils/loginUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("../configs/redis"));
exports.getUsers = async (req, res) => {
    try {
        const users = await User_1.default.findAll();
        return res.status(200).json(users);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
};
exports.getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await User_1.default.findOne({ where: { id } });
        if (data == null)
            return res.status(400).json("Usuario no existe");
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
};
exports.createUser = async (req, res) => {
    const { correo, nombre, password, rut } = req.body;
    console.log(correo, nombre, password, rut);
    try {
        let enc;
        if (password) {
            enc = await loginUtils_1.encriptar(password);
        }
        const user = User_1.default.build({
            correo,
            nombre,
            rut,
            // tslint:disable-next-line: object-literal-sort-keys
            password: enc,
        });
        const usuario = await user.save();
        let tokenuser = {
            email: usuario.dataValues.correo,
            rut: usuario.dataValues.rut,
            id: usuario.dataValues.id,
        };
        let token = jsonwebtoken_1.default.sign(tokenuser, `${process.env.TOKEN_SECRET}`, {
            expiresIn: 60 * 60 * 2,
        });
        redis_1.default.setex(token, 60 * 60 * 2, JSON.stringify(tokenuser));
        return res.status(200).json({
            body: usuario,
            token,
            message: "User created successfully",
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e.message);
    }
};
exports.putUser = async (req, res) => {
    const id = req.params.id;
    const { correo, nombre, password, rut, saldo } = req.body;
    let enc;
    if (password) {
        enc = await loginUtils_1.encriptar(password);
    }
    try {
        const user = await User_1.default.update({
            correo,
            nombre,
            rut,
            // tslint:disable-next-line: object-literal-sort-keys
            password: enc,
            saldo,
        }, { where: { id } });
        // if (user == 0) return res.status(400).json('Usuario no existe');
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
};
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User_1.default.destroy({
            where: {
                id,
            },
        });
        if (user === 0)
            return res.status(400).json("Usuario no existe");
        return res.status(200).json(`Usuario eliminado`);
    }
    catch (e) {
        return res.status(500).json(e.message);
    }
};
//# sourceMappingURL=userController.js.map