//
// ─── AUTHENTICATION ROUTES ──────────────────────────────────────────────────────
//

/* eslint-disable no-underscore-dangle */

const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();
const User = require('../../models/user');


// ENDPOINT TO SIGN UP THE USER
router.post('/sign-up', (req, res) => {
  // Grab and serve the sign up page
  const user = new User(req.body)
  user.save().then( (savedUser) => {

    const token = jwt.sign({ _id: savedUser._id}, 'YItK3jZCII', { expiresIn: '60 days'} );
    console.log('Token is ' + token);
    res.cookie('scToken', token, { maxAge: 900000 });
    res.status(200).send({ user: savedUser} );
  })

})

// ENDPOINT TO SING IN THE USER
router.post('/sign-in', (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  User.findOne({ email: userEmail })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(401).send({ message: 'email or password is incorect' });
      }
      
      const token = jwt.sign({ _id: user._id }, 'YItK3jZCII', { expiresIn: '60 days' });
      return res.status(200).cookie('scToken', token, { maxAge: 900000 }).json(user)
    }).catch((error) => {
      return res.send(401).send({ message: 'Email or Password is incorect'})
    });
});


// ENDPOINT TO SIGN OUT THE USER
router.delete('/sign-out', (req, res) => {
  res.clearCookie('scToken');
  res.redirect('https://scholarboard.herokuapp.com/');
});


module.exports = router;
