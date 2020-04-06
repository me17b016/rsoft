const express = require('express');
const cors = require('cors');

const generate = require('./routes/api/generate');

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('Server running in PORT ', PORT));

// routes

app.get('/', (req, res) => res.send('Welcome to backend'));

app.use('/generate', generate)