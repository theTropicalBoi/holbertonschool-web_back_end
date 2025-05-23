const express = require('express');
const fs = require('fs');

const app = express();

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const students = lines.slice(1);
      const fields = {};
      students.forEach((line) => {
        const [firstName, , , field] = line.split(',');
        fields[field] = fields[field] || [];
        fields[field].push(firstName);
      });

      let output = `Number of students: ${students.length}\n`;
      for (const [field, names] of Object.entries(fields)) {
        output += `Number of students in ${field}: ${
          names.length
        }. List: ${names.join(', ')}\n`;
      }
      resolve(output.trim());
    });
  });
}

app.get('/', (req, res) => {
  res.type('text').send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const dbPath = process.argv[2];
  countStudents(dbPath)
    .then((data) => {
      res.type('text').send(`This is the list of our students\n${data}`);
    })
    .catch((err) => {
      res.type('text').send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(1245);
module.exports = app;
