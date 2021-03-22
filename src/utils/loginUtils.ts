import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import client from '../config/redis';

import { promisify } from 'util';
const getAsync = promisify(client.get).bind(client);

interface IPayload {
  nombre: string;
  email: string;
  is_active: boolean;
  id: number;
  is_admin: boolean;
  sucursal_user: number;
  iat: number;
  exp: number;
}

export const encriptar = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const compararPass = async ({
  password,
  pass,
}: {
  password: string;
  pass: string;
}): Promise<boolean> => await bcrypt.compare(password, pass);

export const tokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader) return res.status(401).json('Access denied');
    const bearer = tokenHeader.split(' ');
    const token = bearer[1];

    // revisa si el token no esta en redis
    const data = await getAsync(token);

    if (data) {
      return res
        .status(401)
        .json('Usuario no tiene permitido ingresar al sistema');
    }

    jwt.verify(token, `${process.env.TOKEN_SECRET}`, async (err, decoded) => {
      const data = decoded as IPayload;
      if (err) {
        if (err.message == 'jwt expired') {
          const respuesta = await refresh(token);

          return res.status(201).json({ token: respuesta });
        }
      }

      if (!data.is_active) {
        return res
          .status(401)
          .json('Usuario no tiene permitido ingresar al sistema');
      }
    });
    next();
  } catch (e) {
    return res.status(500).json(e);
  }
};

const refresh = async (token: any) => {
  let newToken = '';

  await getAsync(token)
    .then(async (data: any) => {
      if (data) {
        const datos = await JSON.parse(data);

        newToken = jwt.sign(datos, `${process.env.TOKEN_SECRET}`, {
          expiresIn: 60 * 60 * 12,
        });

        client.setex(newToken, 60 * 60 * 24 * 7 * 4, data);
      }
    })
    .catch((e: any) => {
      // tslint:disable-next-line: no-console
      console.log(e);
      return '';
    });
  // client.del(token)
  return newToken;
};

export const logout = (req: Request, res: Response) => {
  const tokenHeader = req.header('Authorization');
  const bearer = tokenHeader?.split(' ');

  if (bearer) {
    const token = bearer[1];
    client.del(token);
  }

  return res.status(200).json('logout');
};

export const verify = async (req: Request, res: Response) => {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader) return res.status(401).json('Access denied');
  const bearer = tokenHeader.split(' ');

  if (bearer[0] !== 'Bearer') return res.status(401).json('Access denied');
  const token = bearer[1];
  if (!token) return res.status(401).json('Access denied');

  // revisa si el token no esta en redis
  const data = await getAsync(token);

  if (data == null) {
    return res
      .status(401)
      .json('Usuario no tiene permitido ingresar al sistema');
  }

  jwt.verify(token, `${process.env.TOKEN_SECRET}`, async (err, decoded) => {
    const data = decoded as IPayload;

    // si esta expirado crea un toklen nuevo y el viejo lo mete en el balcklist
    if (err) {
      if (err.message === 'jwt expired') {
        const respuesta = await refresh(token);

        return res.status(201).json({ token: respuesta });
      }
    }

    if (data == undefined) return res.status(401).json('NO valido');
    if (data.iat > data.exp) return res.status(401).json('Token expirado');

    return res.status(200).json({ data });
  });
};
