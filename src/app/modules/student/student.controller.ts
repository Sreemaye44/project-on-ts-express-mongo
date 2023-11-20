import { Request, Response, response } from 'express';
import { StudentServices } from './student.service';
import StudentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //create a schema validation using zot

    const { student: studentData } = req.body;

    // //data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using zot

    const zotParseData = StudentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zotParseData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error: error.details,
    //   });
    // }

    //send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message:  error.message||'went wrong',
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
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message:'something went wrong',
      error: err,
    });
  }
};
export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
