import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();
//it will call controller function
router.post(
  '/create-semester-registration',
  SemesterRegistrationController.createSemesterRegistration,
);
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationvalidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);
export const SemesterRegistrationtRoutes = router;
