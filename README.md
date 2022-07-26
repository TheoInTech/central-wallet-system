# Central Wallet System Code Exercise

## ⚛️ Technologies Used

![tech](https://skillicons.dev/icons?i=js,ts,nodejs,express,vscode&theme=light)

## 🔨 Installation
1. Clone the github repository
2. Install npm dependencies
```bash
npm install
```

## ♻️ Run App
```bash
npm start
```

## API Documentation

### Central Wallet System API for the following:
- Balance Inquiry
- Cash-In
- Debit
- Transaction History

### Overview
The CWS API is coded as an exercise only.

Several improvements can be done including, but are not limited to, the following:
- Use of authentication / tokens
- Use of middlewares for validation and error handling
- Use external database instead of a temporary JSON variable
- Use server-side date
- More validations for request parameters

### Error Codes
- System only accepts PHP as currency
- Insufficient funds on debit if Amount is greater than Balance
- Negative and 0 amount Cash-In

### Rate limit
Only 1 request every 2 minutes is allowed

### API Reference

#### Balance inquiry

Get remaining balance
```http
  GET /cws/balance-inquiry
```

##### Sample Response

```http
{
    "data": {
        "balance": 100,
        "currency": "PHP"
    }
}
```
---
#### Transaction History

Get all transaction history
```http
  GET /cws/transaction-history
```

##### Sample Response

```http
{
    "data": {
        "txHistory": [
            {
                "id": "8080c452-7adf-441d-ab03-721e60ec5c8f",
                "method": "cash-in",
                "amount": 100,
                "balance": 200,
                "date": "Tue Jul 26 2022 19:43:27 GMT+0800 (China Standard Time)"
            },
            {
                "id": "f2d74490-407b-4565-a414-2fc5fe48fddd",
                "method": "cash-in",
                "amount": 2000,
                "balance": 2200,
                "date": "Tue Jul 26 2022 19:43:34 GMT+0800 (China Standard Time)"
            }
        ]
    }
}
```
---
#### Cash-In

Cash-in an amount and increase remaining balance
```http
  PATCH /cws/cash-in
```

##### Request | JSON
| Parameter     | Type     | Description                      |
| :--------     | :------- | :------------------------------- |
| `amount`      | `number` | **Required**. Amount to cash in. |
| `currency`    | `string` | **Required**. Allows `PHP` only. |

##### Sample Response

```http
{
    "data": {
        "transactionId": "d0697f06-6373-4202-8f2a-4db96e460d65",
        "amount": 50,
        "balance": 150,
        "currency": "PHP"
    },
    "message": "Successfully cashed in!"
}
```
---
#### Debit

Get an amount from the remaining balance
```http
  PATCH /cws/debit
```

##### Request | JSON
| Parameter     | Type     | Description                      |
| :--------     | :------- | :------------------------------- |
| `amount`      | `number` | **Required**. Amount to debit. |
| `currency`    | `string` | **Required**. Allows `PHP` only. |

##### Sample Response

```http
{
    "data": {
        "transactionId": "6360cdfe-b73b-4c04-ae37-4fe21fde584c",
        "amount": 150,
        "balance": 460,
        "currency": "PHP"
    },
    "message": "Successful debit!"
}
```