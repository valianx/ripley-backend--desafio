"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const loginUtils_1 = require("../utils/loginUtils");
const redis_1 = __importDefault(require("../configs/redis"));
exports.loginUser = async (req, res) => {
    const { rut, password } = req.body;
    try {
        let user = await User_1.default.findOne({
            where: { rut },
        });
        if (user) {
            if (user.dataValues.is_active == false)
                return res
                    .status(401)
                    .json("Usuario no tiene permitido ingresar al sistema");
            const iguales = await loginUtils_1.compararPass(user.dataValues.password, password);
            if (iguales === false)
                return res.status(400).json("Contraseña es incorrecta");
            let tokenuser = {
                email: user.dataValues.email,
                rut: user.dataValues.rut,
                id: user.dataValues.id,
            };
            let token = jsonwebtoken_1.default.sign(tokenuser, `${process.env.TOKEN_SECRET}`, {
                expiresIn: 60 * 60 * 2,
            });
            redis_1.default.setex(token, 60 * 60 * 2, JSON.stringify(tokenuser));
            res.status(200).json({
                nombre: user.dataValues.nombre,
                email: user.dataValues.email,
                rut: user.dataValues.rut,
                id: user.dataValues.id,
                token: token,
            });
        }
        else {
            return res.status(400).json("Email no existe");
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e.message);
    }
};
//# sourceMappingURL=loginController.js.map