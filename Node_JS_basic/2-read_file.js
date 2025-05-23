const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  const lines = data.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) {
    console.log('Number of students: 0');
    return;
  }

  const students = lines.slice(1).map(line => line.split(',')).filter(arr => arr.length === lines[0].split(',').length);
  const fields = {};

  for (const student of students) {
    const field = student[student.length - 1].trim();
    const firstname = student[0].trim();
    if (!fields[field]) {
      fields[field] = [];
    }
    fields[field].push(firstname);
  }

  console.log(`Number of students: ${students.length}`);
  for (const field in fields) {
    console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
  }
}

module.exports = countStudents;
