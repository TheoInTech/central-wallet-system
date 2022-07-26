import express from 'express';
import cwsController from '../controllers/cws.controller';
import { checkBody } from '../utils/helper.util';

const router = express.Router();

/* GET balance inquiry */
router.get('/balance-inquiry', cwsController.getBalanceInquiry);

/* GET transaction history */
router.get('/transaction-history', cwsController.getTransactionHistory);

/* PATCH cash-in */
router.patch('/cash-in', checkBody, cwsController.patchCashIn);

/* PATCH debit */
router.patch('/debit', checkBody, cwsController.patchDebit);

export default router;
