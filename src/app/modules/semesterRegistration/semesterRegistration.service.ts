import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { academicSemester } from '../academicSemester/academicSemister.model';
import QueryBuilder from '../../builder/Querybuilder';
import { RegistrationStatus } from './semesterRegistration.const';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  //check if there any registered semester that is already 'UPCOMING' or 'ONGOING'

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status}`,
    );
  }
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
const updateSemesterRegistrationintoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check if the requested registered semester is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found');
  }
  //if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists.status;
  const requestedStatus = payload.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }
  //ensure 'UPCOMING--> ONGOING--> ENDED sequence
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can not directly excchange status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can not directly excchange status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationfromDB,
  getSingleSemesterRegistrationfromDB,
  updateSemesterRegistrationintoDB,
};
