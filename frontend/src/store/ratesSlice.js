import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getFetchUrl from '../fetchApi/fetchApi.js';
import defaultCurrency from '../constatnts/defaultCurrency.js';
import getHeader from '../fetchApi/getHeader.js';

const header = getHeader();

export const latestThank = createAsyncThunk(
  'rates/latestThank',
  async (baseCurrency) => {
    const response = await axios
      .get(getFetchUrl.latest(baseCurrency), { headers: header });
    return response.data;
  },
);

const ratesSlice = createSlice({
  name: 'currenciesRates',
  initialState: {
    loadingStatus: null,
    baseCurrency: defaultCurrency,
    rates: {},
    error: null,
    latestTimestamp: '',
    latestDate: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(latestThank.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(latestThank.rejected, (state, action) => {
        if (action.error.message
          && action.error.message === 'Request failed with status code 429') {
          state.error = '429';
        }
        if (action.error.message
          && action.error.message === 'Request failed with status code 400') {
          state.error = '400';
        }
        if (action.error.message
          && action.error.message === 'Request failed with status code 401') {
          state.error = '401';
        }
        state.loadingStatus = 'failed';
      })
      .addCase(latestThank.fulfilled, (state, action) => {
        state.rates = action.payload.rates;
        state.latestTimestamp = action.payload.timestamp;
        state.latestDate = action.payload.date;
        state.baseCurrency = action.payload.base;
        state.error = null;
        state.loadingStatus = 'loaded';
      });
  },
});
export const getLatestDate = (state) => state.currenciesRates.latestDate;
export const getLatestTimestamp = (state) => state.currenciesRates.latestTimestamp;
export const getRates = (state) => state.currenciesRates.rates;
export const getBaseCurrency = (state) => state.currenciesRates.baseCurrency;
export const getErr = (state) => state.currenciesRates.error;
export const getloadingStatus = (state) => state.currenciesRates.loadingStatus;

export default ratesSlice.reducer;
