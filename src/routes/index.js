const express = require('express');
const authorsRouter = require('./author/author.router');
const groupsRouter = require('./group/group.router');
const booksRouter = require('./book/book.router');
const userRouter = require('./user/user.router');
const {requireAuth} = require('../middleware/auth.middleware');

const router = express.Router();

router.use('/authors', requireAuth, authorsRouter);
router.use('/groups', requireAuth, groupsRouter);
router.use('/books', requireAuth, booksRouter);
router.use('/', userRouter);

module.exports = router;