
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./Config/dbInit');
const courseRoutes = require('./routes/courseRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/courses', courseRoutes);
app.use('/assignments', assignmentRoutes);

// Start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
