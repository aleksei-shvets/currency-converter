import {
  getLatestDate,
  getLatestTimestamp,
  getRates,
  getBaseCurrency,
  getErr,
  getStatusLatestThunk,
  getConvertRate,
  getStatusConvertThunk,
} from './ratesSlice.js';
import { getModalStatus } from './modalSlice.js';

export const ratesSelectors = {
  getLatestDate,
  getLatestTimestamp,
  getRates,
  getBaseCurrency,
  getErr,
  getStatusLatestThunk,
  getConvertRate,
  getStatusConvertThunk,
};

export const modalSelectors = { getModalStatus };
