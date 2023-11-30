import { NextFunction, Request, Response, response } from 'express';
import { StudentServices } from './student.service';
import StudentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getsingleStudentFromDB(studentId);
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Student is retrieved  successfully',
       data: result,
     });
  } catch (err) {
    next(err);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
     sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: 'Student is deleted successfully',
       data: result,
     });
  } catch (err: any) {
   next(err)
  }
};
export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
