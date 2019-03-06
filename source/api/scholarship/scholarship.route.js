//
// ─── SCHOLARSHIP ROUTES ─────────────────────────────────────────────────────────
//

const express = require('express');
const cors = require("cors")
const corsOptions = { origin: 'https://scholarboard.herokuapp.com/'}
const controller = require('./scholarship.controller');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: ALL SCHOLARSHIPS
router.get('/', cors(corsOptions), parcel(controller.GetAllScholarships));

// GET: SPECIFIC SCHOLARSHIP
router.get('/:id', cors(corsOptions),  parcel(controller.GetScholarship));

// GET: SCHOLARSHIP BY ETHNICITY
router.get('/race/:ethnicity', cors(corsOptions), parcel(controller.GetScholarshipEthnicity));

// GET: SCHOLARSHIP BY DATE
router.get('/deadline/:year/:month/:day', cors(corsOptions), parcel(controller.GetScholarshipDate));

module.exports = router;