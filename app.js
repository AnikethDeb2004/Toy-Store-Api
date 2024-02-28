// app.js
const express = require('express');
const app = express();
const { validateInput } = require('./middlewares/validateInput');
const toyRoutes = require('./routes/toys');
const db = require('./config/db');

db();

app.use(express.json());
app.use('/toys', toyRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
