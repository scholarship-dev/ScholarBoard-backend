//
// ─── SCHOLARSHIP ROUTES ─────────────────────────────────────────────────────────
//

const express = require('express');
const controller = require('./scholarship.controller');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: ALL SCHOLARSHIPS
router.get('/', parcel(controller.GetAllScholarships));

// GET: SPECIFIC SCHOLARSHIP
router.get('/:id', parcel(controller.GetScholarship));

// GET: SCHOLARSHIP BY ETHNICITY
router.get('/race/:ethnicity', parcel(controller.GetScholarshipEthnicity));

// GET: SCHOLARSHIP BY DATE
router.get('/deadline/:year/:month/:day', parcel(controller.GetScholarshipDate));

module.exports = router;