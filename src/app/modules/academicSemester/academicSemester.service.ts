import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { academicSemester } from './academicSemister.model';

const createAcademicSemisterIntoDB = async (payload: TAcademicSemester) => {
  //semester name ----> semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await academicSemester.create(payload);
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemisterIntoDB,
};
