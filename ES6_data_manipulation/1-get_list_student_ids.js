export default function getListStudentsIds(array) {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.map((student) => student.id);
}
