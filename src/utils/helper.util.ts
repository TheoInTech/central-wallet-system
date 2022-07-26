import createError from 'http-errors';

export function checkBody(req, _res, next) {
  // Improvement: make allowed list dynamic
  const allowedParams = new Set(['amount', 'currency']);
  for (const prop in req.body) {
    if (
      Object.prototype.hasOwnProperty.call(req.body, prop) &&
      !allowedParams.has(prop)
    ) {
      next(createError(400, 'Unexpected parameter in POST body'));
    }
  }
  next();
}

module.exports = {
  checkBody,
};
