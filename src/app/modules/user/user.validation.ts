import { z } from 'zod';
//admin jegula dibe segular vcalidation korte hobe, default model ei set kora jehetu ase , so ekhane lagbena

const userValidationSchema = z.object({
    //id will be auto generated, not provided from client
  passowrd: z
    .string({invalid_type_error: 'password must be string'})
    .max(20, { message: 'password can not be more than 20 characters' }).optional(),
});

export const Uservalidation = {
  userValidationSchema
};
 