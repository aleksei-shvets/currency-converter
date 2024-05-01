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
    console.log(response.data.rates);
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
  reducers: {
    updateBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(latestThank.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(latestThank.rejected, (state, action) => {
        state.error = action.error;
        state.loadingStatus = 'failed';
      })
      .addCase(latestThank.fulfilled, (state, action) => {
        state.rates = action.payload.rates;
        state.latestTimestamp = action.payload.timestamp;
        state.latestDate = action.payload.date;
        state.error = null;
        state.loadingStatus = 'loaded';
      });
  },
});
export const getLatestDate = (state) => state.currenciesRates.latestDate;
export const getLatestTimestamp = (state) => state.currenciesRates.latestTimestamp;
export const getRates = (state) => state.currenciesRates.rates;
export const getBaseCurrency = (state) => state.currenciesRates.baseCurrency;
export const { updateBaseCurrency } = ratesSlice.actions;
export default ratesSlice.reducer;
