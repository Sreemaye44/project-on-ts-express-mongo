import { Model, Types } from 'mongoose';
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactName: string;
  motherName: string;
  motherOccupation: string;
  motherContactName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAdress: string;
  permanentAdress: string;
  guardian: TGuardian;
  localGurdian: TLocalGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

//For creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

//For creating instance

// export type StudentMehod={
//   isUserExists(id: string):Promise<TStudent|null>
// }

// export type StudentModel=Model<TStudent, Record<string,never>, StudentMehod>
