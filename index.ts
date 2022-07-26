import express from "express";

import fs from "fs/promises";
import cors from "cors";
import lodash from "lodash";
import { v4 as uuid } from "uuid";

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`CWS Server is running on: http://localhost:${PORT}`));
