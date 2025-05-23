const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

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
      const students = lines.slice(1).map((line) => line.split(',')).filter((fields) => fields.length === 4 && fields[0]);
      const fields = {};
      students.forEach((student) => {
        const field = student[3];
        if (!fields[field]) fields[field] = [];
        fields[field].push(student[0]);
      });
      let output = `Number of students: ${students.length}`;
      for (const [field, names] of Object.entries(fields)) {
        output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      }
      resolve(output);
    });
  });
}

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.set('Content-Type', 'text/plain');
  const database = process.argv[2];
  let response = 'This is the list of our students';
  if (!database) {
    response += '\nCannot load the database';
    res.send(response);
    return;
  }
  try {
    const studentsInfo = await countStudents(database);
    response += `\n${studentsInfo}`;
    res.send(response);
  } catch (err) {
    response += `\n${err.message}`;
    res.send(response);
  }
});

app.listen(port);

module.exports = app;