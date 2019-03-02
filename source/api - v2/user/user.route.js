//
// ─── USER ROUTES ────────────────────────────────────────────────────────────────
//

const express = require('express');
const controller = require('./user.controller');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: ALL SCHOLARSHIPS
router.get('/user/dashboard', parcel(controller.MatchScholarship));

module.exports = router;