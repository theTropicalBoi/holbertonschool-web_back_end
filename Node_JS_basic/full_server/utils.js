import fs from 'fs/promises';

const readDatabase = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length <= 1) return {};

    const header = lines[0].split(',');
    const students = lines.slice(1);
    const fields = {};

    students.forEach((line) => {
      const student = line.split(',');
      if (student.length === header.length) {
        const firstName = student[0];
        const field = student[header.length - 1];
        fields[field] = fields[field] || [];
        fields[field].push(firstName);
      }
    });

    return fields;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

export default readDatabase;