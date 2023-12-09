const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/game.html'));
});

app.get('/lose', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/lose.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
