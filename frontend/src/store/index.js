import { configureStore } from '@reduxjs/toolkit';
import ratesSlice from './ratesSlice.js';

export default configureStore({
  reducer: {
    currenciesRates: ratesSlice,
  },
});
