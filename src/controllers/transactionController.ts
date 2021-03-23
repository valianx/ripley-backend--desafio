import { Request, Response } from "express";
import Transferencia from "models/Transferencia";
import User from "../models/User";

import { jsPDF } from "jspdf";
const { v4: uuidv4 } = require("uuid");
import path from "path";

import { mailerPdf } from "../configs/mail";

export const transferencia = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { debtorRut, destinationRut, amount } = req.body;
  //obtiene la cuenta debtor de la db
  const debtor = await User.findOne({ where: { rut: debtorRut } });
  //valida si existe la cuenta y tiene fondos
  let valido = validateDebtor(debtor, amount);

  if (valido !== 0) {
    return res.status(400).json(valido);
  }

  const destination = await User.findOne({ where: { rut: destinationRut } });

  valido = validardestination(destination);

  if (valido != 0) {
    return res.status(400).json(valido);
  }

  const transferencia = await nuevaTransferencia(debtor, destination, amount);
  sendPdf(debtor, destination, true, amount, false);
  return res.status(200).json({ data: transferencia });
};

export const retiro = async (req: Request, res: Response): Promise<any> => {
  const { rut, amount } = req.body;

  const user = await User.findOne({ where: { rut } });

  if (!user) {
    return res.status(400).json({ error: "Usuario no válido" });
  }
  if (user.dataValues.saldo - amount < 0) {
    return res.status(400).json({
      error:
        "Usuario no centa con saldo suficiente para realizar la transacción",
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
  return res.status(200).json("Operación realizada con éxito");
};

export const carga = async (req: Request, res: Response): Promise<any> => {
  const { rut, amount } = req.body;

  const user = await User.findOne({ where: { rut } });
  if (!user) {
    return res.status(400).json({ error: "Usuario no válido" });
  }
  if (amount <= 0) {
    return res.status(400).json({
      error: "Cantidad no válida",
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
  sendPdf(user, null, true, amount, false);
  return res.status(200).json("Saldo actualizado");
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
    destinatario_user: destination,
    origen_user: debtor,
  });
  await transferencia.save();
  return transferencia;
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
    mensaje = `<p>Estimado ${origen?.dataValues.nombre}</p><p>su transferencia de ha ido exitosa</p>`;
    email = origen?.dataValues.email;
    titulo = "Notificación de transferencia";
    pdf = await createPdf();

    await mailerPdf(titulo, mensaje, email, pdf);

    mensaje = `<p>Estimado ${destino?.dataValues.nombre}</p><p>ha recibido un pago exitosamente</p>`;
    email = destino?.dataValues.email;
    pdf = await createPdf();

    await mailerPdf(titulo, mensaje, email, pdf);
  } else {
    if (carga) {
      mensaje = `<p>Estimado ${origen?.dataValues.nombre}</p><p>se ha abonado saldo a su cuenta</p>`;
      email = origen?.dataValues.email;
      titulo = "Notificación de abono";
      pdf = await createPdf();

      await mailerPdf(titulo, mensaje, email, pdf);
    } else {
      mensaje = `<p>Estimado ${origen?.dataValues.nombre}</p><p>se ha hecho un retiro exitosamente</p>`;
      email = origen?.dataValues.email;
      titulo = "Notificación de abono";
      pdf = await createPdf();

      await mailerPdf(titulo, mensaje, email, pdf);
    }
  }
};

const createPdf = async () => {
  const doc = new jsPDF();
  let uuid = uuidv4();
  let pathPdf = path.join(__dirname, `../public/tmp/${uuid}.pdf`);

  doc.text("Hello world!", 10, 10);

  doc.save(pathPdf);
  return pathPdf;
};
