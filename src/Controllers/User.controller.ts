import * as UserService from '../Services/User.service';
import { Request, Response } from 'express';

export const userSignup = async (req: Request, res: Response): Promise<any> => {
  const { email, password, referal_code, profile } = req.body;
  const user = await UserService.signUp({
    email,
    password,
    referal_code,
    profile,
  });
  if (!user) {
    return res.status(400).json({
      message: 'invalid user credentials',
    });
  }
  return res.status(200).json({
    user,
  });
};

export const userSignin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const user = await UserService.login({ email, password });
  if (!user) {
    return res.status(400).json({
      message: 'invalid user credentials',
    });
  }
  return res.status(200).json({
    user,
  });
};
