import { z } from 'zod';
//admin jegula dibe segular vcalidation korte hobe, default model ei set kora jehetu ase , so ekhane lagbena

const createAcademicDepartmentValidationSchema = z.object({
  //id will be auto generated, not provided from client
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be string',
      required_error: 'Faculty is required',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  //id will be auto generated, not provided from client
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be string',
      required_error: 'Faculty is required',
    }),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
