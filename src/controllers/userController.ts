import { Request, Response } from 'express';
import User from '../models/User';
import { encriptar } from '../utils/loginUtils';

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
  res: Response,
): Promise<any> => {
  const id = req.params.id;
  try {
    const data = await User.findOne({ where: { id } });
    if (data == null) return res.status(400).json('Usuario no existe');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { correo, nombre, password, rut } = req.body;

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
    return res.status(200).json({
      body: usuario,
      message: 'User created successfully',
    });
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

export const putUser = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  const { correo, nombre, password, rut } = req.body;
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
      },
      { where: { id } },
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
    if (user === 0) return res.status(400).json('Usuario no existe');
    return res.status(200).json(`Usuario eliminado`);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
