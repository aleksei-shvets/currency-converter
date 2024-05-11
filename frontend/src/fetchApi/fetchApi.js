const baseUrl = 'https://api.freecurrencyapi.com/v1/';

const getUrlOfBaseCurrency = (baseCurrency) => {
  const apiUrl = new URL('latest', baseUrl);
  const params = apiUrl.searchParams;
  params.set('base_currency', baseCurrency);
  return apiUrl.href;
};

const getFetchUrl = {
  latest: (baseCurrency) => getUrlOfBaseCurrency(baseCurrency),
};

export default getFetchUrl;
