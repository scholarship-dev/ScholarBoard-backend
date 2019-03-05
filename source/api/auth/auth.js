//
// ─── AUTHENTICATION ROUTES ──────────────────────────────────────────────────────
//

/* eslint-disable no-underscore-dangle */

const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();
const User = require('../user/user.model');


// ENDPOINT TO SIGN UP THE USER
router.post('/sign-up', (req, res) => {

  const user = new User(req.body)
  user.save()
    .then( (savedUser) => {
      const token = jwt.sign({ _id: savedUser._id, email: savedUser.email, username: savedUser.username }, process.env.JWT_SECRET, {
        expiresIn: "60 days"
      });

      res.sendStatus(200).cookie("SUToken", token, {maxAge: 900000})
    }).catch( (error) => {
      response.status(400).json({ "error" : error})
    })

})

// ENDPOINT TO SING IN THE USER
router.post('/sign-in', (req, res) => {

  const userEmail = req.body.email;
  const userPassword = req.body.password;

  User.findOne({ email: userEmail })
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: 'email or password is incorect' })
      }

      user.comparePassword(password, (err, isMatch) => {
        if(!isMatch) {
          console.log('is no match');
          
          res.status(401).send({ message: 'email or password is incorect' })
        } else {
          console.log("is match baby");
          
          // create token and send it as cookie
          const token = jwt.sign({ _id: user._id, email: savedUser.email, username: savedUser.username }, process.env.JWT_SECRET, { expiresIn: '60 days' })
          res.status(200).cookie('SUToken', token, { maxAge: 900000 })
        }
      }).catch( (err) => {
        res.status(401).send(err)
      })
    }).catch((error) => {
      return res.status(401).send(error)
    });
});


// ENDPOINT TO SIGN OUT THE USER
router.delete('/sign-out', (req, res) => {

  res.status(200).clearCookie('scToken');
});

module.exports = router;
