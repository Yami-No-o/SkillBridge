const express = require('express');
const cors = require('cors');
require('dotenv').config();

const workerRoutes = require('./routes/worker.routes');
const jobRoutes = require('./routes/job.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/worker', workerRoutes);
app.use('/api/job', jobRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'SkillBridge API is running ✅' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});