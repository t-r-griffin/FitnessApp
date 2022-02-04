const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const Google = mongoose.model('Google');

const router = express.Router();

router.post('/googleSignup', async (req, res) => {
  const { id, email, givenName } = req.body;

  const google = await Google.findOne({ id });
  if (google) {
    const token = jwt.sign({ userId: google._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } else {
    try {
      const google = new Google({ id, email, givenName });
      await google.save();
      const token = jwt.sign({ userId: google._id }, 'MY_SECRET_KEY');
      const createPassword = 'Must create password';
      res.send({ token, createPassword });
    } catch (err) {
      console.log(err);
    }
  }
});

router.post('/updateGoogleUsername', async (req) => {
  console.log(req.body);
  let { id, email, username } = req.body;
  console.log(username);
  if (!username) {
    username =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }
  console.log(email);
  console.log(username);

  try {
    const google = await Google.findOne({ id });
    await google.updateOne({ userName: username });
  } catch (err) {
    console.log(err);
  }
});

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
