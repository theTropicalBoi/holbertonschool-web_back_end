const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = data.split('\n').filter((line) => line.trim() !== '');
  if (lines.length < 2) {
    console.log('Number of students: 0');
    return;
  }

  const header = lines[0].split(',');
  const students = lines.slice(1);

  const fields = {};
  let totalStudents = 0;

  students.forEach((line) => {
    const student = line.split(',');
    if (student.length === header.length) {
      const field = student[header.length - 1];
      const firstName = student[0];
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
      totalStudents += 1;
    }
  });

  console.log(`Number of students: ${totalStudents}`);
  for (const field in fields) {
    console.log(
      `Number of students in ${field}: ${fields[field].length}. List: ${fields[
        field
      ].join(', ')}`
    );
  }
}

module.exports = countStudents;
