import {
  getLatestDate, getLatestTimestamp, getRates, getBaseCurrency,
} from './ratesSlice.js';

const ratesSelectors = {
  getLatestDate,
  getLatestTimestamp,
  getRates,
  getBaseCurrency,
};

export default ratesSelectors;
