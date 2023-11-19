import { Request, Response, response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try{
const {student : studentData} = req.body;

//will call service function to send this data

const result = await StudentServices.createStudentIntoDB(studentData);

//send response
res.status(200).json({
  success: true,
  message: 'student is created successfully',
  data: result,
});
  }catch(error){
    console.log(error)
  }
};

const getAllStudents=async(req:Request, res:Response)=>{
  try{
    const result=await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });

  }catch(error){
    console.log(error);
  }
}
const getSingleStudent=async(req:Request, res:Response)=>{
  try{
    const {studentId}=req.params;
    const result=await StudentServices.getsingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieved successfully',
      data: result,
    });

  }catch(error){
    console.log(error);
  }
}
export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent
};