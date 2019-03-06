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

      res.sendStatus(200).cookie("scToken", token, {maxAge: 900000})
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
      // send an authorized code if wrong credentials provided
      if (!user) {
        res.sendStatus(401)
      } else {
                // send an authorized code if password does not match
        user.comparePassword(userPassword, (err, isMatch) => {
          if(!isMatch) {
            return res.sendStatus(401)
          } else {

            // create token and send it as cookie          
            const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '60 days' })
            res.cookie('scToken', token, { maxAge: 900000 })
            return res.sendStatus(200)
          }
        })
      }
    }).catch( (error) => {
      return res.sendStatus(401)
    });
});


// ENDPOINT TO SIGN OUT THE USER
router.delete('/sign-out', (req, res) => {

  res.status(200).clearCookie('scToken');
});

module.exports = router;
