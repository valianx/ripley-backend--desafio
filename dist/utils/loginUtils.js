"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.logout = exports.tokenValidation = exports.compararPass = exports.encriptar = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// tslint:disable-next-line: import-name
const redis_1 = __importDefault(require("../configs/redis"));
const util_1 = require("util");
const getAsync = util_1.promisify(redis_1.default.get).bind(redis_1.default);
exports.encriptar = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
};
exports.compararPass = async (password, pass) => bcryptjs_1.default.compare(password, pass);
exports.tokenValidation = async (req, res, next) => {
    try {
        const tokenHeader = req.header("Authorization");
        if (!tokenHeader)
            return res.status(401).json("Access denied");
        const bearer = tokenHeader.split(" ");
        const token = bearer[1];
        // revisa si el token no esta en client
        const data = await getAsync(token);
        if (data) {
            return res
                .status(401)
                .json("Usuario no tiene permitido ingresar al sistema");
        }
        jsonwebtoken_1.default.verify(token, `${process.env.TOKEN_SECRET}`, async (err, decoded) => {
            if (err) {
                if (err.message === "jsonwebtoken expired") {
                    const respuesta = await refresh(token);
                    return res.status(201).json({ token: respuesta });
                }
            }
        });
        next();
    }
    catch (e) {
        return res.status(500).json(e);
    }
};
const refresh = async (token) => {
    let newToken = "";
    await getAsync(token)
        .then(async (data) => {
        if (data) {
            const datos = await JSON.parse(data);
            newToken = jsonwebtoken_1.default.sign(datos, `${process.env.TOKEN_SECRET}`, {
                expiresIn: 60 * 60 * 12,
            });
            redis_1.default.setex(newToken, 60 * 60 * 24 * 7 * 4, data);
        }
    })
        .catch((e) => {
        // tslint:disable-next-line: no-console
        console.log(e);
        return "";
    });
    // client.del(token)
    return newToken;
};
exports.logout = (req, res) => {
    const tokenHeader = req.header("Authorization");
    const bearer = tokenHeader === null || tokenHeader === void 0 ? void 0 : tokenHeader.split(" ");
    if (bearer) {
        const token = bearer[1];
        redis_1.default.del(token);
    }
    return res.status(200).json("logout");
};
exports.verify = async (req, res) => {
    const tokenHeader = req.header("Authorization");
    if (!tokenHeader)
        return res.status(401).json("Access denied");
    const bearer = tokenHeader.split(" ");
    if (bearer[0] !== "Bearer")
        return res.status(401).json("Access denied");
    const token = bearer[1];
    if (!token)
        return res.status(401).json("Access denied");
    // revisa si el token no esta en client
    const data = await getAsync(token);
    if (data == null) {
        return res
            .status(401)
            .json("Usuario no tiene permitido ingresar al sistema");
    }
    jsonwebtoken_1.default.verify(token, `${process.env.TOKEN_SECRET}`, async (err, decoded) => {
        // tslint:disable-next-line: no-shadowed-variable
        const data = decoded;
        // si esta expirado crea un toklen nuevo y el viejo lo mete en el balcklist
        if (err) {
            if (err.message === "jsonwebtoken expired") {
                const respuesta = await refresh(token);
                return res.status(201).json({ token: respuesta });
            }
        }
        if (data === undefined)
            return res.status(401).json("NO valido");
        if (data.iat > data.exp)
            return res.status(401).json("Token expirado");
        return res.status(200).json({ data });
    });
};
//# sourceMappingURL=loginUtils.js.map