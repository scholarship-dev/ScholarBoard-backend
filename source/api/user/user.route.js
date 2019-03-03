//
// ─── USER ROUTES ────────────────────────────────────────────────────────────────
//

const express = require('express');
const controller = require('./user.controller');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: ALL MATCHING SCHOLARSHIPS
router.get('/dashboard', parcel(controller.MatchScholarship));

// GET: USER PROFILE
router.get('/profile/:email', parcel(controller.GetProfile)); 

module.exports = router;