const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/db');

const app = express();

dotenv.config({ path: './.env' });

//middlewares
app.use(express.json());
app.use(cors());

//routes
const routes = require('./routes');
app.use(routes);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'No Route Found For This Path' });
});

app.listen(9000, () => {
  console.log(`✅ Server running on http://localhost:9000`);
});
