import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { compararPass } from "../utils/loginUtils";
import client from "../configs/redis";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      where: { email },
    });

    if (user) {
      if (user.dataValues.is_active == false)
        return res
          .status(401)
          .json("Usuario no tiene permitido ingresar al sistema");

      const iguales = await compararPass(user.dataValues.password, password);

      if (iguales === false)
        return res.status(400).json("Contraseña es incorrecta");

      let tokenuser = {
        email: user.dataValues.email,
        rut: user.dataValues.rut,
        id: user.dataValues.id,
      };

      let token = jwt.sign(tokenuser, `${process.env.TOKEN_SECRET}`, {
        expiresIn: 60 * 60 * 2,
      });
      client.setex(token, 60 * 60 * 2, JSON.stringify(tokenuser));
      res.status(200).json({
        nombre: user.dataValues.nombre,
        email: user.dataValues.email,
        rut: user.dataValues.rut,
        id: user.dataValues.id,
        token: token,
      });
    } else {
      return res.status(400).json("Email no existe");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e.message);
  }
};
