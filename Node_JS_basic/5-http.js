const http = require('http');
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
        resolve('Number of students: 0');
        return;
      }
      const fields = {};
      const students = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue;
        const parts = line.split(',');
        if (parts.length < 4) continue;
        const name = parts[0].trim();
        const field = parts[3].trim();
        if (!fields[field]) fields[field] = [];
        fields[field].push(name);
        students.push(name);
      }
      let output = `Number of students: ${students.length}`;
      for (const [field, names] of Object.entries(fields)) {
        output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      }
      resolve(output);
    });
  });
}

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');
    const dbPath = process.argv[2];
    if (!dbPath) {
      res.end('Cannot load the database');
      return;
    }
    try {
      const result = await countStudents(dbPath);
      res.end(result);
    } catch (err) {
      res.end('Cannot load the database');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
