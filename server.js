/* --------------------------------------------------
   server.js  –  simple in-memory / JSON-file backend
   -------------------------------------------------- */
const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = 3000;
const dbFile = path.join(__dirname, 'data', 'database.json');

/* ---------- helpers to read / write JSON ---------- */
function readDB() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({ users: [], rides: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
}
function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

/* ------------------ middleware -------------------- */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/* ---------------- user routes --------------------- */
//  POST /api/register   {email,password,role}
app.post('/api/register', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: 'All fields required' });

  const db = readDB();
  if (db.users.find(u => u.email === email)) return res.status(409).json({ message: 'User already exists' });

  db.users.push({ email, password, role });
  writeDB(db);
  res.status(201).json({ message: 'Registered successfully' });
});

//  POST /api/login   {email,password,role}
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful', role: user.role, email: user.email });
});

/* ---------------- ride routes --------------------- */
//  POST /api/rides   {passengerEmail,pickup,destination}
app.post('/api/rides', (req, res) => {
  const { passengerEmail, pickup, destination } = req.body;
  if (!passengerEmail || !pickup || !destination) return res.status(400).json({ message: 'Missing data' });

  const db = readDB();
  const newRide = {
    id: Date.now().toString(),
    passengerEmail,
    pickup,
    destination,
    status: 'Pending',
    driverEmail: null
  };
  db.rides.push(newRide);
  writeDB(db);
  res.status(201).json({ message: 'Ride requested', ride: newRide });
});

//  GET /api/rides?passenger=email
app.get('/api/rides', (req, res) => {
  const { passenger } = req.query;
  const db = readDB();
  const data = passenger ? db.rides.filter(r => r.passengerEmail === passenger) : db.rides;
  res.json(data);
});

//  GET /api/rides/pending   → list for drivers
app.get('/api/rides/pending', (_req, res) => {
  const db = readDB();
  res.json(db.rides.filter(r => r.status === 'Pending'));
});

//  POST /api/rides/:id/accept   {driverEmail}
app.post('/api/rides/:id/accept', (req, res) => {
  const { driverEmail } = req.body;
  const db = readDB();
  const ride = db.rides.find(r => r.id === req.params.id && r.status === 'Pending');
  if (!ride) return res.status(404).json({ message: 'Ride not found or already accepted' });

  ride.status = 'Accepted';
  ride.driverEmail = driverEmail;
  writeDB(db);
  res.json({ message: 'Ride accepted', ride });
});

/* ------------------ start up ---------------------- */
app.listen(PORT, () => console.log(`🚀  http://localhost:${PORT}`));
