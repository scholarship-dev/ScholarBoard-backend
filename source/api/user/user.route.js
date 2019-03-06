//
// ─── USER ROUTES ────────────────────────────────────────────────────────────────
//

const express = require('express');
const express = require('express');
const cors = require("cors")
const corsOptions = { origin: 'https://scholarboard.herokuapp.com/'}
const controller = require('./user.controller');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: ALL MATCHING SCHOLARSHIPS
router.get('/dashboard', cors(corsOptions), parcel(controller.MatchScholarship));

// GET: USER PROFILE
router.get('/profile/:email', cors(corsOptions), parcel(controller.GetProfile)); 

module.exports = router;