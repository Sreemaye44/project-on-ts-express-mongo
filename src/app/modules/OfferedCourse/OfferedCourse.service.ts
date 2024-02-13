import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  //check of the semester registrationn id is exist
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(SemesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found!',
    );
  }
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found!',
    );
  }
  const result = await OfferedCourse.create(payload);
  return result;
};
// const getAllAcademicFacultiesFromDB = async () => {
//   const result = await OfferedCourse.find();
//   return result;
// };

// const getSingleAcademicFacultyFromDB = async (id: string) => {
//   const result = await AcademicFaculty.findById(id);
//   return result;
// };

// const updateAcademicFacultyIntoDB = async (
//   id: string,
//   payload: Partial<TAcademicFaculty>,
// ) => {
//   const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   });
//   return result;
// };

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
