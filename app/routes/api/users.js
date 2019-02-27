/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const express = require('express');

const router = express.Router();
const User = require('../../models/user');

// ENDPOINT TO GET A USER PROFILE
router.get('/api/profile/:email', (req, res) => {
  const email = req.params.email;
  User.findOne({ email });
  then((user) => {
    res.status(200).send(user);
  }).catch((error) => {
    res.status(401).send({ error });
  });
});

module.exports = router;
