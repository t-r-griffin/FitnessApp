const mongoose = require('mongoose');

const googleSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  givenName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    sparse: true,
    required: false,
  },
});

mongoose.model('Google', googleSchema);
