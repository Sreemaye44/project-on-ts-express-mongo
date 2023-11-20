import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';
import validator from 'validator';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true, //space remove
    maxlength: [20, 'First name can not be more than 20'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitaliza format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});
const GuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'father occupation Name is required'],
  },
  fatherContactName: {
    type: String,
    trim: true,
    required: [true, 'father contact No is required'],
  },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true },
  motherContactName: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
});
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  }, //using enum type
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  dateOfBirth: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAdress: { type: String, required: true },
  permanentAdress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  localGurdian: { type: LocalGuardianSchema, required: true },
  profileImage: { type: String, required: true },
  isActive: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

//creating model

export const StudentModel = model<Student>('student', studentSchema);
