import { CourseEntity } from "../../course/course.entity";
import { StudentEntity } from "../../student/entities/student.entity";

export interface Matriculation {
  id: number;
  student: StudentEntity;
  course: CourseEntity;
}