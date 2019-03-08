const express = require('express');
const cors = require("cors")
const scholarshipRoutes = require('./api/scholarship/scholarship.route');
const userRoutes = require('./api/user/user.route');
const authRouter = require('./api/auth/auth');
//const checkAuth = require("")

const router = express.Router();

router.use(cors())
router.use('/scholarships', scholarshipRoutes);
router.use('/users', userRoutes);
router.use(authRouter);

module.exports = router;
