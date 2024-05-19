import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getFetchUrl from '../fetchApi/fetchApi.js';
import defaultCurrency from '../constatnts/defaultCurrency.js';
import getHeader from '../fetchApi/getHeader.js';

const header = getHeader();

export const latestThank = createAsyncThunk(
  'rates/latestThunk',
  async (baseCurrency) => {
    const response = await axios
      .get(getFetchUrl.latest(baseCurrency), { headers: header });
    return response.data;
  },
);

export const convertThunk = createAsyncThunk(
  'rates/convertThunk',
  async ({ baseCurrency, toCurrency }) => {
    const response = await axios
      .get(getFetchUrl.convert(baseCurrency, toCurrency), { headers: header });
    return response.data.data[toCurrency];
  },
);

const ratesSlice = createSlice({
  name: 'currenciesRates',
  initialState: {
    loadingStatus: null,
    convertLoadingStatus: null,
    baseCurrency: defaultCurrency,
    rates: {},
    convertingRate: null,
    error: null,
    latestTimestamp: '',
    latestDate: '',
  },
  reducers: {
    resetErr: (state, action) => {
      state.error = action.payload;
    },
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
        state.rates = action.payload.data;
        state.latestTimestamp = action.payload.timestamp;
        state.latestDate = action.payload.date;
        state.baseCurrency = action.payload.base;
        state.error = null;
        state.loadingStatus = 'loaded';
      })
      .addCase(convertThunk.fulfilled, (state, action) => {
        state.convertingRate = action.payload;
        state.error = null;
        state.convertLoadingStatus = 'loaded';
      })
      .addCase(convertThunk.pending, (state) => {
        state.convertLoadingStatus = 'loading';
      })
      .addCase(convertThunk.rejected, (state, action) => {
        state.error = action.error; // TODO rework to network error
      });
  },
});
export const getLatestDate = (state) => state.currenciesRates.latestDate;
export const getLatestTimestamp = (state) => state.currenciesRates.latestTimestamp;
export const getRates = (state) => state.currenciesRates.rates;
export const getBaseCurrency = (state) => state.currenciesRates.baseCurrency;
export const getErr = (state) => state.currenciesRates.error;
export const getStatusLatestThunk = (state) => state.currenciesRates.loadingStatus;
export const getConvertRate = (state) => state.currenciesRates.convertingRate;
export const getStatusConvertThunk = (state) => state.currenciesRates.convertLoadingStatus;

export const { resetErr, updateBaseCurrency } = ratesSlice.actions;

export default ratesSlice.reducer;
