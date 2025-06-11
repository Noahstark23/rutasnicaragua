const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

let routes = [];
let stops = [];

// Load routes from file if exists
const dataPath = path.join(__dirname, 'data.json');
if (fs.existsSync(dataPath)) {
  const data = JSON.parse(fs.readFileSync(dataPath));
  routes = data.routes || [];
  stops = data.stops || [];
}

function saveData() {
  fs.writeFileSync(dataPath, JSON.stringify({ routes, stops }, null, 2));
}

function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  const match = await bcrypt.compare(password, PASSWORD_HASH);
  if (match) {
    const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

app.get('/api/routes', authenticate, (req, res) => {
  res.json(routes);
});

app.post('/api/routes', authenticate, (req, res) => {
  const route = { id: Date.now(), ...req.body };
  routes.push(route);
  saveData();
  res.json(route);
});

app.put('/api/routes/:id', authenticate, (req, res) => {
  const idx = routes.findIndex(r => r.id === parseInt(req.params.id));
  if (idx >= 0) {
    routes[idx] = { ...routes[idx], ...req.body };
    saveData();
    res.json(routes[idx]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/routes/:id', authenticate, (req, res) => {
  routes = routes.filter(r => r.id !== parseInt(req.params.id));
  saveData();
  res.json({ success: true });
});

app.get('/api/routes/:id/stops', authenticate, (req, res) => {
  const routeStops = stops.filter(s => s.routeId === parseInt(req.params.id));
  res.json(routeStops);
});

app.post('/api/routes/:id/stops', authenticate, (req, res) => {
  const stop = { id: Date.now(), routeId: parseInt(req.params.id), ...req.body };
  stops.push(stop);
  saveData();
  res.json(stop);
});

app.put('/api/stops/:id', authenticate, (req, res) => {
  const idx = stops.findIndex(s => s.id === parseInt(req.params.id));
  if (idx >= 0) {
    stops[idx] = { ...stops[idx], ...req.body };
    saveData();
    res.json(stops[idx]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/stops/:id', authenticate, (req, res) => {
  stops = stops.filter(s => s.id !== parseInt(req.params.id));
  saveData();
  res.json({ success: true });
});

const upload = multer({ dest: 'uploads/' });

app.post('/api/import', authenticate, upload.single('file'), (req, res) => {
  const json = JSON.parse(fs.readFileSync(req.file.path));
  routes = json.routes || routes;
  stops = json.stops || stops;
  saveData();
  fs.unlinkSync(req.file.path);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log('Backend running on port', PORT);
});
