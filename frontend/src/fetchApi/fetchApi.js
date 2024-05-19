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

const getFetchUrl = {
  latest: (baseCurrency) => getUrlOfBaseCurrency(baseCurrency),
  convert: (baseCurrency, toCurrency) => getUrlConvert(baseCurrency, toCurrency),
};

export default getFetchUrl;
