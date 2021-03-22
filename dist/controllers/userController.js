"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const loginUtils_1 = require("../utils/loginUtils");
exports.createUser = async (req, res) => {
    const { nombre, email, telefono, password, is_active, is_admin, categoria_user, } = req.body;
    try {
        let enc;
        if (password) {
            enc = await loginUtils_1.encriptar(password);
        }
        const user = await User_1.default.build({
            nombre,
            email,
            telefono,
            password: enc,
            is_active,
            is_admin,
            categoria_user,
        });
        let usuario = await user.save();
        return res.status(200).json({
            message: 'User created successfully',
            body: usuario.dataValues,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e.message);
    }
};
//# sourceMappingURL=userController.js.map