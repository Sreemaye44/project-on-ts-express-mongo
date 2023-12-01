import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { StudentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

//it will call controller function
router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;
