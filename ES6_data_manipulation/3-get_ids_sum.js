export default function getStudentIdsSum(students) {
  return students.reduce((value, students) => value + students.id, 0);
}