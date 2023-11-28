import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    //create a schema validation using zot

    const { password, student: studentData } = req.body;

    // //data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using zot

    // const zotParseData = StudentValidationSchema.parse(studentData);

    const result = await UserService.createStudentIntoDB(password, studentData);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'went wrong',
      error: error,
    });
  }
};

export const 
