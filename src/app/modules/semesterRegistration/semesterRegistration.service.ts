import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { academicSemester } from '../academicSemester/academicSemister.model';
import QueryBuilder from '../../builder/Querybuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const accademicSemester = payload?.academicSemester;
  //check the semester is exist

  const isAcedemicSemesterExists =
    await academicSemester.findById(accademicSemester);
  if (!isAcedemicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic Semester Not found!',
    );
  }
  //is alredy registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    accademicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Semester is already registered!',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationfromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationfromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationintoDB = async (id: string) => {};
export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationfromDB,
  getSingleSemesterRegistrationfromDB,
  updateSemesterRegistrationintoDB,
};
