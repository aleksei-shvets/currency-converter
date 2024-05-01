import simbols from '../constatnts/currencies.js';

const baseUrl = 'https://api.apilayer.com/exchangerates_data/';

const allS = simbols.join(',');

const getUrlOfBaseCurrency = (baseCurrency) => {
  const apiUrl = new URL('latest', baseUrl);
  const params = apiUrl.searchParams;
  params.set('simbols', allS);
  params.set('base', baseCurrency);
  return apiUrl.href;
};

const getFetchUrl = {
  latest: (baseCurrency) => getUrlOfBaseCurrency(baseCurrency),
};

export default getFetchUrl;
