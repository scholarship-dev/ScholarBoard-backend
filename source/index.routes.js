const express = require('express');

const scholarshipRoutes = require('./api/scholarship/scholarship.route');
const userRoutes = require('./api/user/user.route');
const authRouter = require('./api/auth/auth');

const router = express.Router();

router.use('/scholarships', scholarshipRoutes);
router.use('/users', userRoutes);
router.use(authRouter);

module.exports = router;
