import express from 'express';
import { createUser, login } from '../controllers/userController';

export const userRoutes = express.Router();

userRoutes.post('/New-User', createUser);
userRoutes.post('/Login', login);
