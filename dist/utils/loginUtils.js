"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const redis_1 = __importDefault(require("../config/redis"));
const { promisify } = require('util');
const getAsync = promisify(redis_1.default.get).bind(redis_1.default);
exports.encriptar = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return await bcryptjs_1.default.hash(password, salt);
};
exports.compararPass = async function (password, pass) {
    return await bcryptjs_1.default.compare(password, pass);
};
exports.tokenValidation = async (req, res, next) => {
    try {
        const tokenHeader = req.header('Authorization');
        if (!tokenHeader)
            return res.status(401).json('Access denied');
        const bearer = tokenHeader.split(' ');
        const token = bearer[1];
        //revisa si el token no esta en redis
        let data = await getAsync(token);
        if (data == null)
            return res
                .status(401)
                .json('Usuario no tiene permitido ingresar al sistema');
        jsonwebtoken_1.default.verify(token, `${process.env.TOKEN_SECRET}`, async (err, decoded) => {
            let data = decoded;
            if (err) {
                if (err.message == 'jwt expired') {
                    let respuesta = await refresh(token);
                    return res.status(201).json({ token: respuesta });
                }
            }
            if (data.is_active == false)
                return res
                    .status(401)
                    .json('Usuario no tiene permitido ingresar al sistema');
        });
        next();
    }
    catch (e) {
        return res.status(500).json(e);
    }
};
const refresh = async (token) => {
    let newToken = '';
    await getAsync(token)
        .then(async (data) => {
        if (data) {
            let datos = await JSON.parse(data);
            newToken = jsonwebtoken_1.default.sign(datos, `${process.env.TOKEN_SECRET}`, {
                expiresIn: 60 * 60 * 12,
            });
            redis_1.default.setex(newToken, 60 * 60 * 24 * 7 * 4, data);
        }
    })
        .catch((e) => {
        console.log(e);
        return '';
    });
    // client.del(token)
    return newToken;
};
exports.logout = (req, res) => {
    const tokenHeader = req.header('Authorization');
    const bearer = tokenHeader ? .split(' ') : ;
    if (bearer) {
        const token = bearer[1];
        redis_1.default.del(token);
    }
    return res.status(200).json('logout');
};
exports.verify = async (req, res) => {
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader)
        return res.status(401).json('Access denied');
    const bearer = tokenHeader.split(' ');
    console.log(bearer);
    if (bearer[0] != 'Bearer')
        return res.status(401).json('Access denied');
    const token = bearer[1];
    if (!token)
        return res.status(401).json('Access denied');
    //revisa si el token no esta en redis
    let data = await getAsync(token);
    if (data == null) {
        return res
            .status(401)
            .json('Usuario no tiene permitido ingresar al sistema');
    }
    jsonwebtoken_1.default.verify(token, `${process.env.TOKEN_SECRET}`, async (err, decoded) => {
        let data = decoded;
        //si esta expirado crea un toklen nuevo y el viejo lo mete en el balcklist
        if (err) {
            if (err.message == 'jwt expired') {
                let respuesta = await refresh(token);
                return res.status(201).json({ token: respuesta });
            }
        }
        if (data == undefined)
            return res.status(401).json('NO valido');
        if (data.iat > data.exp)
            return res.status(401).json('Token expirado');
        return res.status(200).json({ data: data });
    });
};
//# sourceMappingURL=loginUtils.js.map