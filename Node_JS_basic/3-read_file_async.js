// 3-read_file_async.js
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter(line => line.trim() !== '');
      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const header = lines[0].split(',');
      const students = lines.slice(1);
      const fields = {};

      students.forEach(line => {
        const student = line.split(',');
        if (student.length === header.length) {
          const field = student[student.length - 1].trim();
          const firstname = student[0].trim();
          fields[field] = fields[field] || [];
          fields[field].push(firstname);
        }
      });

      console.log(`Number of students: ${students.length}`);
      for (const [field, names] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;
