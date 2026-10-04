const path = require('path');
const fs = require('fs');
const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const preferredPort = Number(process.env.PORT) || 4000;
const dataDirectory = path.join(__dirname, 'data');
fs.mkdirSync(dataDirectory, { recursive: true });
const database = low(new FileSync(path.join(dataDirectory, 'students.json')));
database.defaults({ students: [] }).write();
const students = () => database.get('students');
const now = () => new Date().toISOString();
const nextId = () => students().map('id').max().value() + 1 || Date.now();
const seedStudents = (student) => students().push({ ...student, id: nextId(), createdAt: now(), updatedAt: now() }).write();
const count = students().size().value();
if (count === 0) {
  [
      { name: 'Maya Patel', email: 'maya.patel@northstar.edu', course: 'Computer Science', year: 'Year 3', status: 'Active', phone: '+1 555 010 2841' },
      { name: 'Jordan Lee', email: 'jordan.lee@northstar.edu', course: 'Product Design', year: 'Year 2', status: 'Active', phone: '+1 555 010 1187' },
      { name: 'Amara Okafor', email: 'amara.okafor@northstar.edu', course: 'Environmental Science', year: 'Year 4', status: 'On leave', phone: '+1 555 010 4420' }
  ].forEach(seedStudents);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const validStatuses = new Set(['Active', 'On leave', 'Graduated']);

function validateStudent(payload) {
  const fields = ['name', 'email', 'course', 'year'];
  const missing = fields.filter((field) => !String(payload[field] || '').trim());
  if (missing.length) return `Please provide ${missing.join(', ')}.`;
  if (!/^\S+@\S+\.\S+$/.test(payload.email)) return 'Please provide a valid email address.';
  if (payload.status && !validStatuses.has(payload.status)) return 'Please choose a valid status.';
  return null;
}

app.get('/api/students', (req, res) => {
  const search = String(req.query.search || '').trim().toLowerCase();
  const records = students().value().filter((student) => !search || [student.name, student.email, student.course].some((value) => value.toLowerCase().includes(search))).sort((a, b) => a.name.localeCompare(b.name));
  res.json(records);
});

app.get('/api/students/:id', (req, res) => {
  const student = students().find({ id: Number(req.params.id) }).value();
  if (!student) return res.status(404).json({ error: 'Student not found.' });
  res.json(student);
});

app.post('/api/students', (req, res) => {
  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ error });
  try {
    if (students().find({ email: req.body.email.trim().toLowerCase() }).value()) return res.status(409).json({ error: 'A student with this email already exists.' });
    const student = { id: nextId(), name: req.body.name.trim(), email: req.body.email.trim().toLowerCase(), course: req.body.course.trim(), year: req.body.year.trim(), status: req.body.status || 'Active', phone: String(req.body.phone || '').trim(), createdAt: now(), updatedAt: now() };
    students().push(student).write();
    res.status(201).json(student);
  } catch (error) { res.status(500).json({ error: 'Unable to create student.' }); }
});

app.put('/api/students/:id', (req, res) => {
  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const id = Number(req.params.id);
    const duplicate = students().find({ email: req.body.email.trim().toLowerCase() }).value();
    if (duplicate && duplicate.id !== id) return res.status(409).json({ error: 'A student with this email already exists.' });
    const student = students().find({ id }).value();
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    Object.assign(student, { name: req.body.name.trim(), email: req.body.email.trim().toLowerCase(), course: req.body.course.trim(), year: req.body.year.trim(), status: req.body.status || 'Active', phone: String(req.body.phone || '').trim(), updatedAt: now() });
    database.write();
    res.json(student);
  } catch (error) { res.status(500).json({ error: 'Unable to update student.' }); }
});

app.delete('/api/students/:id', (req, res) => {
  const student = students().find({ id: Number(req.params.id) }).value();
  if (!student) return res.status(404).json({ error: 'Student not found.' });
  students().remove({ id: Number(req.params.id) }).write();
  res.status(204).end();
});

app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found.' }));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

function start(port, attemptsLeft = 10) {
  const server = app.listen(port, () => console.log(`Student manager running at http://localhost:${port}`));
  server.on('error', (error) => {
    if (error.code !== 'EADDRINUSE' || attemptsLeft === 0) throw error;
    console.warn(`Port ${port} is in use, trying ${port + 1}...`);
    start(port + 1, attemptsLeft - 1);
  });
}

start(preferredPort);
