require('./models/User.js');
require('./models/Google');
const keys = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

mongoose.connect(keys.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

app.get('/', requireAuth, (req, res) => {
  res.send('Hi there');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
