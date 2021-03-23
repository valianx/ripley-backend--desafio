"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carga = exports.retiro = exports.transferencia = void 0;
const Transferencia_1 = __importDefault(require("models/Transferencia"));
const User_1 = __importDefault(require("../models/User"));
const jspdf_1 = require("jspdf");
const { v4: uuidv4 } = require("uuid");
const path_1 = __importDefault(require("path"));
const mail_1 = require("../configs/mail");
exports.transferencia = async (req, res) => {
    const { debtorRut, destinationRut, amount } = req.body;
    //obtiene la cuenta debtor de la db
    const debtor = await User_1.default.findOne({ where: { rut: debtorRut } });
    //valida si existe la cuenta y tiene fondos
    let valido = validateDebtor(debtor, amount);
    if (valido !== 0) {
        return res.status(400).json(valido);
    }
    const destination = await User_1.default.findOne({ where: { rut: destinationRut } });
    valido = validardestination(destination);
    if (valido != 0) {
        return res.status(400).json(valido);
    }
    const transferencia = await nuevaTransferencia(debtor, destination, amount);
    sendPdf(debtor, destination, true, amount, false);
    return res.status(200).json({ data: transferencia });
};
exports.retiro = async (req, res) => {
    const { rut, amount } = req.body;
    const user = await User_1.default.findOne({ where: { rut } });
    if (!user) {
        return res.status(400).json({ error: "Usuario no válido" });
    }
    if (user.dataValues.saldo - amount < 0) {
        return res.status(400).json({
            error: "Usuario no centa con saldo suficiente para realizar la transacción",
        });
    }
    User_1.default.update({
        saldo: user.dataValues.saldo - amount,
    }, {
        where: { rut },
    });
    sendPdf(user, null, false, amount, false);
    return res.status(200).json("Operación realizada con éxito");
};
exports.carga = async (req, res) => {
    const { rut, amount } = req.body;
    const user = await User_1.default.findOne({ where: { rut } });
    if (!user) {
        return res.status(400).json({ error: "Usuario no válido" });
    }
    if (amount <= 0) {
        return res.status(400).json({
            error: "Cantidad no válida",
        });
    }
    User_1.default.update({
        saldo: user.dataValues.saldo + amount,
    }, {
        where: { rut },
    });
    sendPdf(user, null, true, amount, false);
    return res.status(200).json("Saldo actualizado");
};
const nuevaTransferencia = async (debtor, destination, amount) => {
    await User_1.default.update({
        amount: (debtor === null || debtor === void 0 ? void 0 : debtor.dataValues.saldo) - amount,
    }, {
        where: {
            rut: debtor === null || debtor === void 0 ? void 0 : debtor.dataValues.rut,
        },
    });
    await User_1.default.update({
        amount: (destination === null || destination === void 0 ? void 0 : destination.dataValues.saldo) + amount,
    }, {
        where: {
            rut: destination === null || destination === void 0 ? void 0 : destination.dataValues.rut,
        },
    });
    const transferencia = Transferencia_1.default.build({
        amount,
        destinatario_user: destination,
        origen_user: debtor,
    });
    await transferencia.save();
    return transferencia;
};
const validardestination = (destination) => {
    if (!destination) {
        return {
            error: "Imposible realizar la transferencia. Cuenta de destino inválida",
        };
    }
    return 0;
};
const validateDebtor = (debtor, amount) => {
    if (!debtor || debtor.dataValues.saldo <= 0) {
        return {
            error: "Imposible realizar la transferencia. Cuenta de destino inválida",
        };
    }
    if (!debtor || debtor.dataValues.saldo - amount < 0) {
        return {
            error: "Imposible realizar la transferencia. La cuenta no posee saldo suficiente",
        };
    }
    return 0;
};
const sendPdf = async (origen, destino, isTransferencia, amount, carga) => {
    let titulo;
    let email;
    let mensaje;
    let pdf;
    if (isTransferencia) {
        mensaje = `<p>Estimado ${origen === null || origen === void 0 ? void 0 : origen.dataValues.nombre}</p><p>su transferencia de ha ido exitosa</p>`;
        email = origen === null || origen === void 0 ? void 0 : origen.dataValues.email;
        titulo = "Notificación de transferencia";
        pdf = await createPdf();
        await mail_1.mailerPdf(titulo, mensaje, email, pdf);
        mensaje = `<p>Estimado ${destino === null || destino === void 0 ? void 0 : destino.dataValues.nombre}</p><p>ha recibido un pago exitosamente</p>`;
        email = destino === null || destino === void 0 ? void 0 : destino.dataValues.email;
        pdf = await createPdf();
        await mail_1.mailerPdf(titulo, mensaje, email, pdf);
    }
    else {
        if (carga) {
            mensaje = `<p>Estimado ${origen === null || origen === void 0 ? void 0 : origen.dataValues.nombre}</p><p>se ha abonado saldo a su cuenta</p>`;
            email = origen === null || origen === void 0 ? void 0 : origen.dataValues.email;
            titulo = "Notificación de abono";
            pdf = await createPdf();
            await mail_1.mailerPdf(titulo, mensaje, email, pdf);
        }
        else {
            mensaje = `<p>Estimado ${origen === null || origen === void 0 ? void 0 : origen.dataValues.nombre}</p><p>se ha hecho un retiro exitosamente</p>`;
            email = origen === null || origen === void 0 ? void 0 : origen.dataValues.email;
            titulo = "Notificación de abono";
            pdf = await createPdf();
            await mail_1.mailerPdf(titulo, mensaje, email, pdf);
        }
    }
};
const createPdf = async () => {
    const doc = new jspdf_1.jsPDF();
    let uuid = uuidv4();
    let pathPdf = path_1.default.join(__dirname, `../public/tmp/${uuid}.pdf`);
    doc.text("Hello world!", 10, 10);
    doc.save(pathPdf);
    return pathPdf;
};
//# sourceMappingURL=transactionController.js.map