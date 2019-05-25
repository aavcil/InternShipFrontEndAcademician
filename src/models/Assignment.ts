import { StudentForAssignment } from './StudentForAssignment';
import { TeacherForAssignment } from './TeacherForStudent';

export class Assignment{
    id:number;
    studentId:number;
    teacherId:number;
    student:StudentForAssignment;
    teachers:TeacherForAssignment;
}