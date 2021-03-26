import { Request, Response } from "express";
import Transferencia from "../models/Transferencia";
import User from "../models/User";

import { jsPDF } from "jspdf";
const { v4: uuidv4 } = require("uuid");
import path from "path";

import { mailerPdf } from "../configs/mail";

export const transferencia = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { origenRut, destinoRut, amount } = req.body;

  //obtiene la cuenta debtor de la db
  const debtor = await User.findOne({ where: { rut: origenRut } });
  //valida si existe la cuenta y tiene fondos
  let valido = validateDebtor(debtor, amount);

  if (valido !== 0) {
    return res.status(400).json(valido);
  }
  //obtiene la cuenta de destino
  const destination = await User.findOne({ where: { rut: destinoRut } });

  valido = validardestination(destination);

  if (valido != 0) {
    return res.status(400).json(valido);
  }
  //como se ha validado, se ejecuta la nueva transferencia
  const transferencia = await nuevaTransferencia(debtor, destination, amount);

  //se envian los pdfs correspondientes
  sendPdf(debtor, destination, true, amount, false);
  return res.status(200).json({
    data: transferencia,
    newBalance: debtor?.dataValues.saldo - amount,
  });
};

export const retiro = async (req: Request, res: Response): Promise<any> => {
  const { rut, amount } = req.body;

  const user = await User.findOne({ where: { rut } });

  if (!user) {
    return res.status(400).json({ error: "Usuario no válido" });
  }
  if (amount <= 0) {
    return res.status(400).json({
      error: "Monto no válido",
    });
  }
  if (user.dataValues.saldo - amount < 0) {
    return res.status(400).json({
      error:
        "Usuario no cuenta con saldo suficiente para realizar la transacción",
    });
  }

  User.update(
    {
      saldo: user.dataValues.saldo - amount,
    },
    {
      where: { rut },
    }
  );
  sendPdf(user, null, false, amount, false);
  return res.status(200).json({
    mensaje: "Operación realizada con éxito",
    monto: user.dataValues.saldo - amount,
  });
};

export const carga = async (req: Request, res: Response): Promise<any> => {
  const { rut, amount } = req.body;
  console.log(rut, amount);
  const user = await User.findOne({ where: { rut } });
  if (!user) {
    return res.status(400).json({ error: "Usuario no válido" });
  }
  if (amount <= 0) {
    return res.status(400).json({
      error: "Monto no válido",
    });
  }

  User.update(
    {
      saldo: user.dataValues.saldo + amount,
    },
    {
      where: { rut },
    }
  );
  sendPdf(user, null, false, amount, true);
  return res.status(200).json({
    mensaje: "Saldo actualizado",
    monto: user.dataValues.saldo + amount,
  });
};

const nuevaTransferencia = async (
  debtor: User | null,
  destination: User | null,
  amount: number
): Promise<any> => {
  await User.update(
    {
      amount: debtor?.dataValues.saldo - amount,
    },
    {
      where: {
        rut: debtor?.dataValues.rut,
      },
    }
  );
  await User.update(
    {
      amount: destination?.dataValues.saldo + amount,
    },
    {
      where: {
        rut: destination?.dataValues.rut,
      },
    }
  );

  const transferencia = Transferencia.build({
    amount,
    destinatario_user: destination?.dataValues.id,
    origen_user: debtor?.dataValues.id,
  });
  await transferencia.save();
  return transferencia;
};

export const getTransferencias = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  try {
    const transferencias = await Transferencia.findAll({
      where: { origen_user: id },
    });
    return res.status(200).json(transferencias);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e.message);
  }
};

const validardestination = (destination: User | null) => {
  if (!destination) {
    return {
      error: "Imposible realizar la transferencia. Cuenta de destino inválida",
    };
  }

  return 0;
};
const validateDebtor = (debtor: User | null, amount: number) => {
  if (!debtor || debtor.dataValues.saldo <= 0) {
    return {
      error: "Imposible realizar la transferencia. Cuenta de destino inválida",
    };
  }
  if (!debtor || debtor.dataValues.saldo - amount < 0) {
    return {
      error:
        "Imposible realizar la transferencia. La cuenta no posee saldo suficiente",
    };
  }
  return 0;
};

const sendPdf = async (
  origen: User | null,
  destino: User | null,
  isTransferencia: boolean,
  amount: number,
  carga: boolean
): Promise<any> => {
  let titulo;
  let email;
  let mensaje;
  let pdf;
  if (isTransferencia) {
    titulo = "Notificación de transferencia";
    mensaje = `<p>Estimado ${origen?.dataValues.nombre}</p><p>su transferencia de ha ido exitosa</p>`;
    email = origen?.dataValues.correo;
    pdf = await createPdf();

    await mailerPdf(titulo, mensaje, email, pdf);

    mensaje = `<p>Estimado ${destino?.dataValues.nombre}</p><p>ha recibido un pago exitosamente</p>`;
    email = destino?.dataValues.correo;
    pdf = await createPdf();

    await mailerPdf(titulo, mensaje, email, pdf);
  } else {
    if (carga) {
      mensaje = `<p>Estimado ${origen?.dataValues.nombre}</p><p>se ha abonado saldo a su cuenta</p>`;
      email = origen?.dataValues.correo;
      titulo = "Notificación Banco Ripley";

      pdf = await createPdf();

      await mailerPdf(titulo, mensaje, email, pdf);
    } else {
      mensaje = `<p>Estimado ${origen?.dataValues.nombre}</p><p>se ha hecho un retiro exitosamente</p>`;
      email = origen?.dataValues.correo;
      titulo = "Notificación Banco Ripley";
      pdf = await createPdf();

      await mailerPdf(titulo, mensaje, email, pdf);
    }
  }
};

const createPdf = async (): Promise<string> => {
  const doc = new jsPDF();
  let uuid = uuidv4();
  let pathPdf = path.join(__dirname, `../public/tmp/${uuid}.pdf`);

  doc.text("Hello world!", 10, 10);

  doc.save(pathPdf);
  return pathPdf;
};

