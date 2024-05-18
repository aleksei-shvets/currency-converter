import {
  getLatestDate,
  getLatestTimestamp,
  getRates,
  getBaseCurrency,
  getErr,
  getloadingStatus,
  getConvertRate,
} from './ratesSlice.js';
import { getModalStatus } from './modalSlice.js';

export const ratesSelectors = {
  getLatestDate,
  getLatestTimestamp,
  getRates,
  getBaseCurrency,
  getErr,
  getloadingStatus,
  getConvertRate,
};

export const modalSelectors = { getModalStatus };
