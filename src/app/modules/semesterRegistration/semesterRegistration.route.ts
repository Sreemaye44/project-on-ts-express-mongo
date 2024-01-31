import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();
//it will call controller function
router.post(
  '/create-semester-registration',
  SemesterRegistrationController.createSemesterRegistration,
);
export const SemesterRegistrationtRoutes = router;
