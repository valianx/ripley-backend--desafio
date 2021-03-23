import { Request, Response } from "express";
import Transferencia from "models/Transferencia";
import User from "../models/User";

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

  return res.status(200).json({ data: transferencia });
};

const nuevaTransferencia = async (
  debtor: User | null,
  destination: User | null,
  amount: number
): Promise<any> => {
  //update
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

function validardestination(destination: User | null) {
  if (!destination) {
    return {
      error: "Imposible realizar la transferencia. Cuenta de destino inválida",
    };
  }

  return 0;
}
function validateDebtor(debtor: User | null, amount: number) {
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
}
