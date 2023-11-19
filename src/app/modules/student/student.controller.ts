import { Request, Response, response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    //create a schema validation using joi

    const JoivalidationSchema = Joi.object({
      id: Joi.string(),
      name: {
        firstName: Joi.string().max(20).required(),
        middleName: Joi.string().max(20),
        lastName: Joi.string().max(20)
      },
      gender: Joi.string().required().valid(['male', 'female', ])
    });
    const { student: studentData } = req.body;
    console.log(
      '🚀 ~ file: student.controller.ts:7 ~ createStudent ~ studentData:',
      studentData,
    );

    //will call service function to send this data

    const result = await StudentServices.createStudentIntoDB(studentData);

    //send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getsingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};
export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
