import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './OfferedCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is created successfully',
    data: result,
  });
});

// const getAllAcademicFaculties = catchAsync(async (req, res) => {
//   const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculties are retrieved successfully',
//     data: result,
//   });
// });

// const getSingleAcademicFaculty = catchAsync(async (req, res) => {
//   const { facultyId } = req.params;
//   console.log(
//     '🚀 ~ file: academicFaculty.controller.ts:32 ~ getSingleAcademicFaculty ~ facultyId:',
//     facultyId,
//   );
//   const result =
//     await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
//   console.log(
//     '🚀 ~ file: academicFaculty.controller.ts:33 ~ getSingleAcademicFaculty ~ result:',
//     result,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculty is retrieved succesfully',
//     data: result,
//   });
// });

// const updateAcademicFaculty = catchAsync(async (req, res) => {
//   const { facultyId } = req.params;
//   const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
//     facultyId,
//     req.body,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic faculty is updated succesfully',
//     data: result,
//   });
// });

export const OfferedCourseControllers = {
  createOfferedCourse,
  //   getAllAcademicFaculties,
  //   updateAcademicFaculty,
  //   getSingleAcademicFaculty,
};
