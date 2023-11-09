const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

let playerData = {};

// Get data for user
apiRouter.get('/userData/:user', (req, res) => {
  const userData = playerData[req.params.user];
  if (!userData)
  {
    userData = { wins: 0, losses: 0 };
    playerData[req.params.user] = userData;
  }
  res.send(userData);
});

// Save user data
apiRouter.post('/userData/:user', (req, res) => {
  playerData[req.params.user] = req.body;
  res.send();
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});