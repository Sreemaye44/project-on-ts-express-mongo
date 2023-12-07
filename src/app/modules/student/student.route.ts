import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import studentValidationSchema from './student.joi.validation';
import { StudentValidations } from './student.validation';

const router = express.Router();
//it will call controller function
// router.post('/create-student', studentControllers.createStudent)
router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deleteStudent);
router.patch(
  '/:studentId',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent,
);
export const StudentRoutes = router;
