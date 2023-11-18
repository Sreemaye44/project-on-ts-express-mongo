import express from 'express';
import { studentControllers } from './student.controller';

const router= express.Router();
//it will call controller function
router.post('/create-student', studentControllers.createStudent)
export const StudentRoutes= router;
