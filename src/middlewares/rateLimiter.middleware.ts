import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 seconds in milliseconds
  max: 1,
  message: 'Only 1 request every 5 seconds is allowed!',
  standardHeaders: true,
  legacyHeaders: false,
});
