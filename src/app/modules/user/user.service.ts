import config from '../../config';
import { TStudent } from '../student/student.interface';
import { NewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists');
  //   }
  //create a user object
  const user: NewUser = {};

  //password is not given use default password

  user.password = password || (config.default_password as string);

  //set role
  user.role = 'student';
  //set manually id
  user.id = '29021837901';
  //create a user
  const result = await User.create(user); 

  //create a student

  if(Object.keys(result).length){
    //set id, _id as user
    studentData.id=result.id;
    studentData.user=result._id;
  }
  //built in static method

  // const student = new Student(studentData); //create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save(); //build in instance method
  return result;
};

export const UserService = {
  createStudentIntoDB,
};
