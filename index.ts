import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import lodash from 'lodash';

import cwsRoutes from './src/routes/cws.route';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (_req, res) => {
  res.json({ message: 'ok' });
});

app.use('/cws', cwsRoutes);

/* Error handler */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || '';
  console.error(errMessage, statusCode);
  res.status(statusCode).json({ message: errMessage });

  return;
});

app.listen(PORT, () =>
  console.log(`CWS Server is running on: http://localhost:${PORT}`)
);
