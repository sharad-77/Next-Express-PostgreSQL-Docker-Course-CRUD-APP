import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hasedPassword,
      },
    });

    res
      .status(201)
      .json({ message: 'User Create Successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error In Creating User' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (!email || !password) {
      res.status(400).json({
        error: 'Email and Password are Required',
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const PasswordValid = await bcrypt.compare(password, user?.password);

    if (!PasswordValid) {
      res
        .status(401)
        .json({ message: 'Password is wrong please enter valid password' });
      return;
    }

    const userID = user?.id;

    const payload = { userID, email };
    const token = jwt.sign(payload,jwtSecret,{expiresIn:'7d'});

    res.setHeader("Authorization",`Bearer ${token}`);

    return res.json({ mesaage: 'Login Successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'something went wrong in Login' });
  }
};

