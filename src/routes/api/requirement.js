// API TO FETCH SCHOLARSHIP REQUIREMENTS
const express = require('express');
const router = express.Router();

const Student = require('../../../models/student');
const Scholarship = require('../../../models/scholarship');

// GET ALL SCHOLARSHIPS
router.get('/scholarships', (req, res) => {
  Scholarship.find()
    .then(scholarships => res.json(scholarships));
});

module.exports = router;