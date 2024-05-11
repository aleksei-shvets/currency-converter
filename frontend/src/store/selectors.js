import {
  getLatestDate,
  getLatestTimestamp,
  getRates,
  getBaseCurrency,
  getErr,
  getloadingStatus,
} from './ratesSlice.js';
import { getModalStatus } from './modalSlice.js';

export const ratesSelectors = {
  getLatestDate,
  getLatestTimestamp,
  getRates,
  getBaseCurrency,
  getErr,
  getloadingStatus,
};

export const modalSelectors = { getModalStatus };
