import { v4 as uuid } from 'uuid';

enum TX_METHOD {
  CASH_IN = 'cash-in',
  DEBIT = 'debit',
}
interface TX_HISTORY {
  id: string;
  method: string;
  amount: number;
  balance: number;
  date: string;
}

// Use temporary data from a single user for exam purposes
const cwsData = {
  data: {
    balance: 100.0,
    currency: 'PHP',
    lastUpdated: 'Tue Jul 26 2022 16:15:16 GMT+0800 (China Standard Time)',
    txHistory: [] as TX_HISTORY[],
  },
};

async function balanceInquiry() {
  const { balance, currency } = cwsData.data;
  return {
    data: {
      balance,
      currency,
    },
  };
}

async function transactionHistory() {
  const { txHistory } = cwsData.data;
  return {
    data: {
      txHistory,
    },
  };
}

async function cashIn(tx) {
  const { amount: txAmount, currency: txCurrency } = tx;
  const { balance, currency, txHistory } = cwsData.data;

  if (!txAmount || !txCurrency) {
    throw new Error(`Transaction amount and currency are required`);
  } else if (txCurrency != currency) {
    throw new Error(`System only accepts ${currency} currency`);
  } else if (txAmount <= 0) {
    throw new Error(`Please cash in more than 0 ${currency}`);
  } else if (typeof txAmount !== 'number') {
    throw new Error(`Please input a number amount`);
  }

  const newBalance = txAmount + balance;
  const message = 'Successfully cashed in!';
  const txId = uuid();
  const date = Date().toString(); // Only using client-side time

  cwsData.data = {
    ...cwsData.data,
    balance: newBalance,
    lastUpdated: date,
    txHistory: [
      ...txHistory,
      {
        id: txId,
        method: TX_METHOD.CASH_IN,
        amount: txAmount,
        balance: newBalance,
        date: date,
      },
    ],
  };

  return {
    data: {
      transactionId: txId,
      amount: txAmount,
      balance: newBalance,
      currency,
    },
    message,
  };
}

async function debit(tx) {
  const { amount: txAmount, currency: txCurrency } = tx;
  const { balance, currency, txHistory } = cwsData.data;

  if (!txAmount || !txCurrency) {
    throw new Error(`Transaction amount and currency are required`);
  } else if (txCurrency != currency) {
    throw new Error(`System only accepts ${currency} currency`);
  } else if (txAmount > balance) {
    throw new Error(`Insufficient funds`);
  } else if (typeof txAmount !== 'number') {
    throw new Error(`Please input a number amount`);
  }

  const newBalance = balance - txAmount;
  const message = 'Successful debit!';
  const txId = uuid();
  const date = Date().toString(); // Only using client-side time

  cwsData.data = {
    ...cwsData.data,
    balance: newBalance,
    lastUpdated: date,
    txHistory: [
      ...txHistory,
      {
        id: txId,
        method: TX_METHOD.DEBIT,
        amount: txAmount,
        balance: newBalance,
        date: date,
      },
    ],
  };

  return {
    data: {
      transactionId: txId,
      amount: txAmount,
      balance: newBalance,
      currency,
    },
    message,
  };
}

export default {
  balanceInquiry,
  transactionHistory,
  cashIn,
  debit,
};
