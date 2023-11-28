import express from 'express';

const router = express.Router();
//it will call controller function
router.post('/create-student', userControllers.createStudent);

export const UserRoutes = router;
