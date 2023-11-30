import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists');
  //   }
  //create a user object
  const userData: Partial<TUser> = {};

  //password is not given use default password

  userData.password = password || (config.default_password as string);

  //set role
  userData.role = 'student';
  //set manually id
  userData.id = '29021837901';
  //create a user
  const newUser = await User.create(userData); 

  //create a student

  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;  //reference id

    const newStudent=await Student.create(studentData)
    return newStudent;
  }
  //built in static method

  // const student = new Student(studentData); //create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save(); //build in instance method
};

export const UserService = {
  createStudentIntoDB,
};
