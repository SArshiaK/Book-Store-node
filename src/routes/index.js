const express = require('express');

const authorsRouter = require('./author/author.router');
const groupsRouter = require('./group/group.router');
const booksRouter = require('./book/book.router');
const bookgroupRouter = require('./bookgroup/bookgroup.router');
const userRouter = require('./user/user.router')
const authRouter = require('./auth/auth.router');
const customerRouter = require('./customer/customer.router');
const invoiceRouter = require('./invoice/invoice.router');
const invoicedetailRouter = require('./invoicedetail/invoicedetail.router');
const detailConnectionRouter = require('./detailconnection/detailconnection.router');

const {requireAuth} = require('../middleware/auth.middleware');

const router = express.Router();

router.use('/authors', requireAuth, authorsRouter);
router.use('/groups', requireAuth, groupsRouter);
router.use('/books', requireAuth, booksRouter);
router.use('/bookgroups', requireAuth, bookgroupRouter);
router.use('/users', requireAuth, userRouter);
router.use('/customers', requireAuth, customerRouter);
router.use('/invoices', requireAuth, invoiceRouter);
router.use('/invoicedetails', requireAuth, invoicedetailRouter);
router.use('/detailconnections', requireAuth, detailConnectionRouter);
router.use('/', authRouter);

router.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({success: false, message: err.details[0]});
    }
  
    return res.status(500).json({success: false, message: err.details[0]});
  
  })

module.exports = router;