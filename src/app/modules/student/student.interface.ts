import { Model} from 'mongoose';
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
  password: string;
  name: TUserName;
  email: string;
  gender: 'male' | 'female'|'other';
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAdress: string;
  permanentAdress: string;
  guardian: TGuardian;
  localGurdian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'inactive';
  isDeleted: boolean;
};

//For creating static
export interface StudentModel extends Model<TStudent>{
  isUserExists(id: string): Promise<TStudent|null>
}

//For creating instance

// export type StudentMehod={
//   isUserExists(id: string):Promise<TStudent|null>
// }

// export type StudentModel=Model<TStudent, Record<string,never>, StudentMehod>
