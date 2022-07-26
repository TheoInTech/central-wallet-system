import cwsService from '../services/cws.service';

async function getBalanceInquiry(_req, res, next) {
  try {
    res.json(await cwsService.balanceInquiry());
  } catch (err) {
    console.error('Error while getting balance', err.message);
    next(err);
  }
}

export default {
  getBalanceInquiry,
};
