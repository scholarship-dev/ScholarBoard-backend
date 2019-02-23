const jwt = require("jsonwebtoken")
const express = require("express")
const router = express.Router()
const User = require("../../models/user")

// ENDPOINT TO RENDER THE SIGNIN PAGE
router.get("/api/sign-in", function(req, res){
  // Grab and serve the sign in page
})

// ENDPOINT TO RENDER THE SIGNUP PAGE
router.get("/api/sign-up", function(req, res){
  // Grab and serve the sign up page
  const user = new User(req.body)
  user.save().then( (savedUser) => {
    // create token
    // set cookie
    // redirect user
  })

})

// ENDPOINT TO SING IN THE USER
router.post("/api/sign-in", function(req, res){
  // sign in the user
})

// ENDPOINT TO SIGNUP THE USER
router.post("/api/sign-up", function(req, res){
  // sign up the user
})

// ENDPOINT TO SIGN OUT THE USER
router.post("/api/sign-out", function(req, res){
  // sign out the user
})


module.exports = router
