import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/)
    .messages({
      'string.base': 'First Name must be a string',
      'string.empty': 'First Name is required',
      'string.trim': 'First Name should not contain leading or trailing spaces',
      'string.max': 'First Name cannot be more than {#limit} characters',
      'string.pattern.base':
        'First Name should start with a capital letter and contain only alphabetic characters',
      'any.required': 'First Name is required',
    }),
  middleName: Joi.string().trim().allow('').optional(),
  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      'string.base': 'Last Name must be a string',
      'string.empty': 'Last Name is required',
      'string.trim': 'Last Name should not contain leading or trailing spaces',
      'string.pattern.base':
        'Last Name should contain only alphabetic characters',
      'any.required': 'Last Name is required',
    }),
});

// Joi schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father Name must be a string',
    'string.empty': 'Father Name is required',
    'any.required': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father Occupation must be a string',
    'string.empty': 'Father Occupation is required',
    'any.required': 'Father Occupation is required',
  }),
  fatherContactName: Joi.string().required().messages({
    'string.base': 'Father Contact Name must be a string',
    'string.empty': 'Father Contact Name is required',
    'any.required': 'Father Contact Name is required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother Name must be a string',
    'string.empty': 'Mother Name is required',
    'any.required': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'string.empty': 'Mother Occupation is required',
    'any.required': 'Mother Occupation is required',
  }),
  motherContactName: Joi.string().required().messages({
    'string.base': 'Mother Contact Name must be a string',
    'string.empty': 'Mother Contact Name is required',
    'any.required': 'Mother Contact Name is required',
  }),
});

// Joi schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local Guardian Name must be a string',
    'string.empty': 'Local Guardian Name is required',
    'any.required': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local Guardian Occupation must be a string',
    'string.empty': 'Local Guardian Occupation is required',
    'any.required': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local Guardian Contact Number must be a string',
    'string.empty': 'Local Guardian Contact Number is required',
    'any.required': 'Local Guardian Contact Number is required',
  }),
});

// Joi schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'Student ID must be a string',
    'string.empty': 'Student ID is required',
    'any.required': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender should be either male, female, or other',
    'any.required': 'Gender is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  dateOfBirth: Joi.string().allow('').optional(),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact Number must be a string',
    'string.empty': 'Contact Number is required',
    'any.required': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency Contact Number must be a string',
    'string.empty': 'Emergency Contact Number is required',
    'any.required': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAdress: Joi.string().required().messages({
    'string.base': 'Present Address must be a string',
    'string.empty': 'Present Address is required',
    'any.required': 'Present Address is required',
  }),
  permanentAdress: Joi.string().required().messages({
    'string.base': 'Permanent Address must be a string',
    'string.empty': 'Permanent Address is required',
    'any.required': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGurdian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian information is required',
  }),
  profileImage: Joi.string().required().messages({
    'string.base': 'Profile Image must be a string',
    'string.empty': 'Profile Image is required',
    'any.required': 'Profile Image is required',
  }),
  isActive: Joi.string()
    .valid('active', 'inactive')
    .default('active')
    .optional(),
});

export default studentValidationSchema;
