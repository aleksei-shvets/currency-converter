const baseUrl = 'https://api.freecurrencyapi.com/v1/';
const apiPath = 'latest';

const getUrlOfBaseCurrency = (baseCurrency) => {
  const url = new URL(apiPath, baseUrl);
  const params = url.searchParams;
  params.set('base_currency', baseCurrency);
  return url.href;
};

const getUrlConvert = (baseCurrency, toCurrency) => {
  const url = new URL(apiPath, baseUrl);
  const params = url.searchParams;
  params.set('currencies', toCurrency);
  params.set('base_currency', baseCurrency);
  return url.href;
};

// https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_a1nKOeuDHWsJZKuaIYAdmoFrGvbVF9R6ccBN1Am3&currencies=EUR&base_currency=BGN

const getFetchUrl = {
  latest: (baseCurrency) => getUrlOfBaseCurrency(baseCurrency),
  convert: (baseCurrency, toCurrency) => getUrlConvert(baseCurrency, toCurrency),
};

export default getFetchUrl;
