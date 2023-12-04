import { z } from 'zod';
//admin jegula dibe segular vcalidation korte hobe, default model ei set kora jehetu ase , so ekhane lagbena

const createAcademicFacultyValidationSchema = z.object({
  //id will be auto generated, not provided from client
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic Faculty must be string' }),
  }),
});
const updateAcademicFacultyValidationSchema = z.object({
  //id will be auto generated, not provided from client
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic Faculty must be string' }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
