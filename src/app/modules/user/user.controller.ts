import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //create a schema validation using zot

    const { password, student: studentData } = req.body;

    // //data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using zot

    // const zotParseData = StudentValidationSchema.parse(studentData);

    const result = await UserService.createStudentIntoDB(password, studentData);
    //send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createStudent,
};
