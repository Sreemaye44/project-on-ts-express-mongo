import { z } from 'zod';

// Define Zod schema for UserName
const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/, {
      message:
        'First Name should start with a capital letter and contain only alphabetic characters',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/, {
      message: 'Last Name should contain only alphabetic characters',
    }),
});

// Define Zod schema for Guardian
const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactName: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactName: z.string().min(1),
});

// Define Zod schema for LocalGuardian
const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
});

// Define Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      email: z.string().email(),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAdress: z.string().min(1),
      permanentAdress: z.string().min(1),
      guardian: GuardianValidationSchema,
      localGurdian: LocalGuardianValidationSchema,
      profileImage: z.string().min(1),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
};
