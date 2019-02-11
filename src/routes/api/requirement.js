// THESE ROUTES WILL GIVE YOU THE REQUIREMENTS FOR A SCHOLARSHIP
const Student = require('../../../models/student');
const Scholarship = require('../../../models/scholarship');

const express = require('express');
const router = express.Router();

// GET ALL SCHOLARSHIPS
router.get('/api/scholarships', (req, res) => {
  Scholarship.find
})

module.exports = router;