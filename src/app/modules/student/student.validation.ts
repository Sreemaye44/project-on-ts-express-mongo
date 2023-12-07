import { z } from 'zod';

// Define Zod schema for UserName
const createUserNameValidationSchema = z.object({
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
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/, {
      message:
        'First Name should start with a capital letter and contain only alphabetic characters',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/, {
      message: 'Last Name should contain only alphabetic characters',
    })
    .optional(),
});

// Define Zod schema for Guardian
const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactName: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactName: z.string().min(1),
});
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOccupation: z.string().min(1).optional(),
  fatherContactName: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupation: z.string().min(1).optional(),
  motherContactName: z.string().min(1).optional(),
});

// Define Zod schema for LocalGuardian
const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
});
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  contactNo: z.string().min(1).optional(),
});

// Define Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: createUserNameValidationSchema,
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
      guardian: createGuardianValidationSchema,
      localGurdian: createLocalGuardianValidationSchema,
      profileImage: z.string().min(1),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema.optional(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        email: z.string().email().optional(),
        dateOfBirth: z.string().optional(),
        contactNo: z.string().min(1).optional(),
        emergencyContactNo: z.string().min(1).optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAdress: z.string().min(1).optional(),
        permanentAdress: z.string().min(1).optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGurdian: updateLocalGuardianValidationSchema.optional(),
        profileImage: z.string().min(1).optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
      })
      .optional(),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
