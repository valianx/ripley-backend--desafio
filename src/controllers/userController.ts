import { Request, Response } from 'express';
import User from '../models/User';
import { encriptar, compararPass } from '../utils/loginUtils';

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const {
    nombre,
    email,
    telefono,
    password,
    is_active,
    is_admin,
    categoria_user,
  } = req.body;

  try {
    let enc;
    if (password) {
      enc = await encriptar(password);
    }
    const user = await User.build({
      nombre,
      email,
      telefono,
      password: enc,
      is_active,
      is_admin,
      categoria_user,
    });

    let usuario = await user.save();
    return res.status(200).json({
      message: 'User created successfully',
      body: usuario.dataValues,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e.message);
  }
};
