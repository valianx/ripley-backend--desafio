import { Request, Response } from "express";
import User from "../models/User";
import { encriptar } from "../utils/loginUtils";
import jwt from "jsonwebtoken";
import client from "../configs/redis";

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  try {
    const data = await User.findOne({ where: { id } });
    if (data == null) return res.status(400).json("Usuario no existe");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { correo, nombre, password, rut } = req.body;
  console.log(correo, nombre, password, rut);
  try {
    let enc;
    if (password) {
      enc = await encriptar(password);
    }
    const user = User.build({
      correo,
      nombre,
      rut,
      // tslint:disable-next-line: object-literal-sort-keys
      password: enc,
    });

    const usuario = await user.save();

    let tokenuser = {
      email: usuario.dataValues.correo,
      rut: usuario.dataValues.rut,
      id: usuario.dataValues.id,
    };

    let token = jwt.sign(tokenuser, `${process.env.TOKEN_SECRET}`, {
      expiresIn: 60 * 60 * 2,
    });

    client.setex(token, 60 * 60 * 2, JSON.stringify(tokenuser));
    return res.status(200).json({
      body: usuario,
      token,
      message: "User created successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e.message);
  }
};

export const putUser = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  const { correo, nombre, password, rut, saldo } = req.body;
  let enc;
  if (password) {
    enc = await encriptar(password);
  }

  try {
    const user = await User.update(
      {
        correo,
        nombre,
        rut,
        // tslint:disable-next-line: object-literal-sort-keys
        password: enc,
        saldo,
      },
      { where: { id } }
    );
    // if (user == 0) return res.status(400).json('Usuario no existe');
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  try {
    const user = await User.destroy({
      where: {
        id,
      },
    });
    if (user === 0) return res.status(400).json("Usuario no existe");
    return res.status(200).json(`Usuario eliminado`);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
