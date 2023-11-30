import { Schema, model } from 'mongoose';
import {
  TAcademicSemester
} from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';

const academicSemisterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);
academicSemisterSchema.pre('save', async function(next){
  const isSemesterExists=await academicSemester.findOne({
    name: this.name,
    year: this.year
  })
  if(isSemesterExists){
    throw new Error('Semester is already exists!')
  }
  next()
})

export const academicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemisterSchema,
);
