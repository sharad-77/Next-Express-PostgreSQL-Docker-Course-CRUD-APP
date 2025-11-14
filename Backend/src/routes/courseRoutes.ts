import express from 'express';
import { AllCourseController, DetailCourseController, NewCourseController } from '../controllers/courseController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const courseRoutes = express.Router();

courseRoutes.post('/New-Course', authMiddleware, NewCourseController);

courseRoutes.post('/All-Course', authMiddleware, AllCourseController);

courseRoutes.post('/Course-Detail/:id',authMiddleware, DetailCourseController);
