// 2-read_file.js
const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = data.split('\n').filter(line => line.trim() !== '');
  const header = lines[0].split(',');
  const students = lines.slice(1);

  const fields = {};

  students.forEach(line => {
    const student = line.split(',');
    if (student.length === header.length) {
      const firstname = student[0].trim();
      const field = student[student.length - 1].trim();
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    }
  });

  const totalStudents = students.length;
  console.log(`Number of students: ${totalStudents}`);

  for (const field in fields) {
    console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
  }
}

module.exports = countStudents;
