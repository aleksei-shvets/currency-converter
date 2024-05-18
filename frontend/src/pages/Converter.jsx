/* eslint-disable consistent-return */
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { ratesSelectors } from '../store/selectors.js';
// import FromConvertSelect from '../components/FromConvertInput.jsx';
// import ToConvertSelect from '../components/ToConvertInput.jsx';
// import { convertThunk } from '../store/ratesSlice.js';
// import state from '../store/index.js';
import FormConverter from '../components/FormConverter.jsx';

const Converter = () => {
  console.log('');

  return (
    <div className="container d-inline-flex flex-row justify-content-center flex-wrap rounded p-3 bg-light">
      <FormConverter />
    </div>
  );
};

export default Converter;
