import { NextFunction, Request, RequestHandler, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

type AddFunc = () => {};
const createAcademicSemester = catchAsync(async (req, res, next) =>{
    const result = await AcademicSemesterServices.createAcademicSemisterIntoDB(req.body);
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
};
