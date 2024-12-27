const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/keys', (req, res) => {
  const validKeys = [
    process.env.KEY1,
    process.env.KEY2,
    process.env.KEY3,
    process.env.KEY4,
    process.env.KEY5,
  ];
  res.json({ validKeys });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
