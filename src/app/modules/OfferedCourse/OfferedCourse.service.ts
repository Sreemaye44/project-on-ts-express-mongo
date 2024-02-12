import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
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
