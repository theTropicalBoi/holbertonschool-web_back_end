const http = require('http');
const fs = require('fs');

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
        if (!fields[field]) fields[field] = [];
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

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const dbPath = process.argv[2];
    res.write('This is the list of our students\n');
    countStudents(dbPath)
      .then((data) => res.end(data))
      .catch((err) => res.end(err.message));
  } else {
    res.end();
  }
});

app.listen(1245);
module.exports = app;
