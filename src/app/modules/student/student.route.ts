import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import studentValidationSchema from './student.joi.validation';
import { StudentValidations } from './student.validation';

const router = express.Router();
//it will call controller function
// router.post('/create-student', studentControllers.createStudent)
router.get('/', studentControllers.getAllStudents);
router.get('/:id', studentControllers.getSingleStudent);
router.delete('/:id', studentControllers.deleteStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent,
);
export const StudentRoutes = router;
