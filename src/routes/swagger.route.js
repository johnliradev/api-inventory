import { fileURLToPath } from 'url';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const swaggerDocument = JSON.parse(fs.readFileSync(new URL('../swagger.json', import.meta.url), 'utf-8'));

import { Router } from 'express';
export const swaggerRouter = Router();

swaggerRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
