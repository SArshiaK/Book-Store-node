const express = require('express');
const authorsRouter = require('./author/author.router');
const groupsRouter = require('./group/group.router');
const booksRouter = require('./book/book.router');
const bookgroupRouter = require('./bookgroup/bookgroup.router');
const userRouter = require('./user/user.router')
const authRouter = require('./auth/auth.router');
const {requireAuth} = require('../middleware/auth.middleware');

const router = express.Router();

router.use('/authors', requireAuth, authorsRouter);
router.use('/groups', requireAuth, groupsRouter);
router.use('/books', requireAuth, booksRouter);
router.use('/bookgroups', requireAuth, bookgroupRouter);
router.use('/users', requireAuth, userRouter);
router.use('/', authRouter);

module.exports = router;