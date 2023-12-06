import mongoose from 'mongoose';
import { academicSemester } from '../academicSemester/academicSemister.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { AppError } from '../../errors/AppError';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(studentData); //built in static method

  // const student = new Student(studentData); //create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save(); //build in instance method
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  return result;
};
const getsingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const deletedUser = await User.findByIdAndUpdate(
      { id },
      { isdeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedUser;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getsingleStudentFromDB,
  deleteStudentFromDB,
};
