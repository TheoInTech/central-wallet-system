import cwsService from '../services/cws.service';

async function getBalanceInquiry(_req, res, next) {
  try {
    res.json(await cwsService.balanceInquiry());
  } catch (err) {
    console.error('Error while getting balance', err.message);
    next(err);
  }
}

async function getTransactionHistory(_req, res, next) {
  try {
    res.json(await cwsService.transactionHistory());
  } catch (err) {
    console.error('Error while getting transaction history', err.message);
    next(err);
  }
}

async function patchCashIn(req, res, next) {
  try {
    const tx = req.body;
    res.json(await cwsService.cashIn(tx));
  } catch (err) {
    console.error('Error while cashing in', err.message);
    next(err);
  }
}

async function patchDebit(req, res, next) {
  try {
    const tx = req.body;
    res.json(await cwsService.debit(tx));
  } catch (err) {
    console.error('Error while debit', err.message);
    next(err);
  }
}

export default {
  getBalanceInquiry,
  getTransactionHistory,
  patchCashIn,
  patchDebit,
};
