const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length < 2) {
        console.log('Number of students: 0');
        resolve();
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
          fields[field] = fields[field] || [];
          fields[field].push(firstName);
          totalStudents += 1;
        }
      });

      console.log(`Number of students: ${totalStudents}`);
      for (const [field, names] of Object.entries(fields)) {
        console.log(
          `Number of students in ${field}: ${names.length}. List: ${names.join(
            ', '
          )}`
        );
      }

      resolve();
    });
  });
}

module.exports = countStudents;