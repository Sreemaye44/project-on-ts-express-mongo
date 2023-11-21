import { Schema, model, connect } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student/student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
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
const GuardianSchema = new Schema<TGuardian>({
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

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
  isDeleted: {type: Boolean, defaullt: false}
});

//create pre save middleware
studentSchema.pre('save', async function(next){
const user=this;
user.password=await bcrypt.hash(user.password, Number(config.salt_rounds));
next();
}) 

//post save middleware

studentSchema.post('save', function(doc, next){
doc.password="******";
next();
}) 

//  Query middleware

studentSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true }})
   next();
})
studentSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne: true }})
   next();
})

//creatiing a custom static method
studentSchema.statics.isUserExists = async function (id:string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instance method

// studentSchema.methods.isUserExists= async function(id:string){
//   const existingUser=await Student.findOne({id: id});
//   return existingUser;
// }
export const Student = model<TStudent, StudentModel>('student', studentSchema);
