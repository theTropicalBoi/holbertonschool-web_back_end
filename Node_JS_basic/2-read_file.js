// 2-read_file.js
const fs = require('fs');

function countStudents(path) {
  let database;
  try {
    database = fs.readFileSync(path, 'utf-8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = database.split('\n').filter(line => line.trim() !== '');
  const header = lines[0].split(',');
  const students = lines.slice(1);

  const fields = {};

  for (const line of students) {
    const studentData = line.split(',');
    for (let i = 0; i < header.length; i++) {
      const field = header[i].trim();
      const value = studentData[i].trim();
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(value);
    }
  }

  const totalStudents = students.length;
  console.log(`Number of students: ${totalStudents}`);

  for (const field in fields) {
    console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
  }
}

module.exports = countStudents;