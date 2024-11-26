const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const positionRoutes = require('./routes/positionRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const techRoutes = require('./routes/techRoutes')
const candidateRoutes = require('./routes/candidateRoutes');
const qualificationRoutes = require('./routes/qualificationRoutes');
const universityRoutes = require('./routes/universityRoutes');

const path = require('path')
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', positionRoutes);
app.use('/api', skillsRoutes);
app.use('/api', techRoutes);
app.use('/api', candidateRoutes);
app.use('/api', qualificationRoutes);
app.use('/api', universityRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
