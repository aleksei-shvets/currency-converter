import { configureStore } from '@reduxjs/toolkit';
import ratesSlice from './ratesSlice.js';
import modalSlice from './modalSlice.js';

export default configureStore({
  reducer: {
    currenciesRates: ratesSlice,
    modal: modalSlice,
  },
});
