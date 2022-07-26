import cwsJson from '../data/cws.json';

async function balanceInquiry() {
  return {
    data: {
      balance: cwsJson.balance,
    },
  };
}

export default {
  balanceInquiry,
};
