import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'currenciesRates',
  initialState: {
    isShow: false,
  },
  reducers: {
    show: (state) => {
      state.isShow = true;
    },
    hidden: (state) => {
      state.isShow = false;
    },
  },
});

export const getModalStatus = (state) => state.modal.isShow;
export const { show, hidden } = modalSlice.actions;
export default modalSlice.reducer;
