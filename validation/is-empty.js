/*
 * Returns true for an empty argument
 */
const isEmpty = arg =>
  arg === undefined ||
  arg === null ||
  (typeof arg === 'object' &&
    Object.keys(arg).length === 0) ||
  (typeof arg === 'string' && arg.trim().length === 0);

module.exports = isEmpty;
