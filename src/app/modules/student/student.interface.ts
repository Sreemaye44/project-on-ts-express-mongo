import { Schema, model, connect } from 'mongoose';
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactName: string;
  motherName: string;
  motherOccupation: string;
  motherContactName: string;
};
export type UserName={
    firstName: string;
    middleName: string;
    lastName: string;
  };
  export type LocalGuardian={
    name: string,
    occupation:string,
    contactNo:string,

  }
export type Student = {
  id: string;
  name: UserName;
  email: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAdress: string;
  permanentAdress: string;
  guardian: Guardian;
  localGurdian: LocalGuardian;
  profileImage?: string;
  isActive:'active'|'inactive';
};
