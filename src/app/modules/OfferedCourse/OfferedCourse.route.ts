import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './OfferedCourseValidation';
import { OfferedCourseControllers } from './OfferedCourse.controller';

const router = express.Router();
router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

// router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
// router.patch(
//   '/:facultyId',
//   validateRequest(
//     AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
//   ),
//   AcademicFacultyControllers.updateAcademicFaculty,
// );

// router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const OfferedCourseRoute = router;
