const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Get data for user
apiRouter.get('/userData/:user', async (req, res) => {
  const userData = await DB.getUserData(req.params.user)
  res.send(userData);
});

// Record user win
apiRouter.put('/userData/:user/win', async (req, res) => {
  const userData = await DB.addWin(req.params.user);
  res.send(userData);
});

// Record user loss
apiRouter.put('/userData/:user/lose', async (req, res) => {
  const userData = await DB.addLoss(req.params.user);
  res.send(userData);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});