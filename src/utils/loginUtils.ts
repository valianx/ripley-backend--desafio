import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
// tslint:disable-next-line: import-name
import client from "../configs/redis";

import { promisify } from "util";
const getAsync = promisify(client.get).bind(client);

interface IPayload {
  nombre: string;
  correo: string;
  id: number;
  iat: number;
  exp: number;
}

export const encriptar = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

export const compararPass = async (
  password: string,
  pass: string
): Promise<boolean> => bcryptjs.compare(password, pass);

export const tokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenHeader = req.header("Authorization");
    if (!tokenHeader) return res.status(401).json("Access denied");
    const bearer = tokenHeader.split(" ");
    const token = bearer[1];

    // revisa si el token no esta en client
    const data = await getAsync(token);

    if (data) {
      return res
        .status(401)
        .json("Usuario no tiene permitido ingresar al sistema");
    }

    jsonwebtoken.verify(
      token,
      `${process.env.TOKEN_SECRET}`,
      async (err, decoded) => {
        if (err) {
          if (err.message === "jsonwebtoken expired") {
            const respuesta = await refresh(token);

            return res.status(201).json({ token: respuesta });
          }
        }
      }
    );
    next();
  } catch (e) {
    return res.status(500).json(e);
  }
};

const refresh = async (token: any) => {
  let newToken = "";

  await getAsync(token)
    .then(async (data: any) => {
      if (data) {
        const datos = await JSON.parse(data);

        newToken = jsonwebtoken.sign(datos, `${process.env.TOKEN_SECRET}`, {
          expiresIn: 60 * 60 * 12,
        });

        client.setex(newToken, 60 * 60 * 24 * 7 * 4, data);
      }
    })
    .catch((e: any) => {
      // tslint:disable-next-line: no-console
      console.log(e);
      return "";
    });
  // client.del(token)
  return newToken;
};

export const logout = (req: Request, res: Response) => {
  const tokenHeader = req.header("Authorization");
  const bearer = tokenHeader?.split(" ");

  if (bearer) {
    const token = bearer[1];
    client.del(token);
  }

  return res.status(200).json("logout");
};

export const verify = async (req: Request, res: Response) => {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader) return res.status(401).json("Access denied");
  const bearer = tokenHeader.split(" ");

  if (bearer[0] !== "Bearer") return res.status(401).json("Access denied");
  const token = bearer[1];
  if (!token) return res.status(401).json("Access denied");

  // revisa si el token no esta en client
  const data = await getAsync(token);

  if (data == null) {
    return res
      .status(401)
      .json("Usuario no tiene permitido ingresar al sistema");
  }

  jsonwebtoken.verify(
    token,
    `${process.env.TOKEN_SECRET}`,
    async (err, decoded) => {
      // tslint:disable-next-line: no-shadowed-variable
      const data = decoded as IPayload;

      // si esta expirado crea un toklen nuevo y el viejo lo mete en el balcklist
      if (err) {
        if (err.message === "jsonwebtoken expired") {
          const respuesta = await refresh(token);

          return res.status(201).json({ token: respuesta });
        }
      }

      if (data === undefined) return res.status(401).json("NO valido");
      if (data.iat > data.exp) return res.status(401).json("Token expirado");

      return res.status(200).json({ data });
    }
  );
};
