const express = require('express');

const scholarshipRoutes = require('./api-v2/scholarship/scholarship.route');
const userRoutes = require('./api-v2/user/user.route');
const authRouter = require('./api-v2/auth/auth');

const router = express.Router();

router.use('/scholarships', scholarshipRoutes);
router.use('/users', userRoutes);
router.use(authRouter);

module.exports = router;
