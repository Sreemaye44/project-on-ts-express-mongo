import { z } from 'zod';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';
//admin jegula dibe segular vcalidation korte hobe, default model ei set kora jehetu ase , so ekhane lagbena

const createAcademicSemistervalidationSchema = z.object({
  //id will be auto generated, not provided from client
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemistervalidationSchema,
};
