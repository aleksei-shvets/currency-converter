/* eslint-disable consistent-return */
export default (arr) => {
  const [, fromCurrency, , toCurrency] = arr;
  if (fromCurrency && toCurrency) {
    return [fromCurrency.toUpperCase(), toCurrency.toUpperCase()];
  }
};
