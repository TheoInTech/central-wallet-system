import express from 'express';
import cwsController from '../controllers/cws.controller';

const router = express.Router();

/* GET balance inquiry. */
router.get('/balance-inquiry', cwsController.getBalanceInquiry);

export default router;
