const express = require('express');

const router = express.Router();

const { authRouter } = require('./authRoutes');
const { userRouter } = require('./usersRoutes');
const { authorize } = require('../middlewares/auth');

router.use(authRouter);

router.use(authorize, userRouter);

module.exports = router;
