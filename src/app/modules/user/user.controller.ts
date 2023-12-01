import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

type AddFunc = () => {};
const createStudent = catchAsync(async (req, res, next) => {
  //create a schema validation using zot

  const { password, student: studentData } = req.body;

  // //data validation using joi
  // const { error, value } = studentValidationSchema.validate(studentData);

  //data validation using zot



  const result = await UserService.createStudentIntoDB(password, studentData);
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
};
