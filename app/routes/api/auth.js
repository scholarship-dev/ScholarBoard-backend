const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()
const User = require("../../models/user")


// ENDPOINT TO SIGN UP THE USER
router.get("/api/sign-up", function(req, res){
  // Grab and serve the sign up page
  const user = new User(req.body)
  user.save().then( (savedUser) => {
    // create token
    let token = jwt.sign({ _id: savedUser._id}, process.env.JWT_SECRET, { expiresIn: "60 days"})
    res.cookie("scToken", token, { maxAge: 900000})
    // redirect to dashboard instead
    res.redirect("https://scholarboard.herokuapp.com/")
  })

})

// ENDPOINT TO SING IN THE USER
router.post("/api/sign-in", function(req, res){

  const email = req.body.username
  const password = req.body.password

  User.findOne({ email }, " email password")
    .then(user => {
      if(!user.email){
        return res.status(422).send({ message: "Email is required"})
      }

      if(!user.password){
        return res.status(422)
      }

      const token =  jwt.sign({ _id: user._id, username: user.username}, process.env.SECRET,{ expiresIn: "60 days"})
      res.cookie("scToken", token, { maxAge: 900000})
      // redirect to dashboard instead dashboard
      res.redirect("www.google.com")
    }).catch( (error) => {
      res.send(401).send({ message: "Email or Password is incorect"})
    })
})


// ENDPOINT TO SIGN OUT THE USER
router.post("/api/sign-out", function(req, res){

  res.clearCookie("scToken")
  res.redirect("https://scholarboard.herokuapp.com/")
})


module.exports = router
