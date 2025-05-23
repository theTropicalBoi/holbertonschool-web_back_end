const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length === 0) {
        console.log('Number of students: 0');
        resolve();
        return;
      }
      const students = lines.slice(1).filter((line) => line.trim() !== '');
      const fields = {};
      students.forEach((student) => {
        const parts = student.split(',');
        const field = parts[parts.length - 1];
        const firstname = parts[0];
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      });
      console.log(`Number of students: ${students.length}`);
      for (const [field, names] of Object.entries(fields)) {
        console.log(
          `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`
        );
      }
      resolve();
    });
  });
}

module.exports = countStudents;