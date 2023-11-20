import { TStudent } from './student.interface';
import { Student } from '../student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); /built in static method
  const student = new Student(studentData); //create an instance

  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await student.save(); //build in instance method
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getsingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getsingleStudentFromDB,
};
