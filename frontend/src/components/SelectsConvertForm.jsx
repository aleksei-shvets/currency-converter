/* eslint-disable consistent-return */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ratesSelectors } from '../store/selectors.js';
import FromConvertSelect from './components/FromConvertInput.jsx';
import ToConvertSelect from './components/ToConvertInput.jsx';
import { convertThunk } from '../store/ratesSlice.js';
// import state from '../store/index.js';

const Converter = () => {
  const dispatch = useDispatch();
  const [rates, setRates] = useState({});
  const stateRates = useSelector(ratesSelectors.getRates);
  const currentBase = useSelector(ratesSelectors.getBaseCurrency);
  const [fromCurrency, setFromCurrency] = useState(currentBase);
  const [toCurrency, setToCurrency] = useState(currentBase);
  const [countConvertFrom, setCountConvertFrom] = useState(1);
  const [convertRate, setConvertRate] = useState(null);

  const converting = useSelector(ratesSelectors.getConvertRate);

  useEffect(() => {
    setRates(stateRates);
  }, [stateRates]);

  useEffect(() => {
    if (converting) {
      setConvertRate(converting);
    }
  }, [converting]);

  const convertWithBaseCurrency = () => {
    const toRate = rates[toCurrency];
    return Number(countConvertFrom) * Number(toRate);
  };

  const convertDifferntCurrencies = () => {
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    dispatch(convertThunk);

    if (fromRate === toRate) {
      return countConvertFrom;
    }
    if (convertRate) {
      return Number(countConvertFrom) * convertRate;
    }
  };

  const convertCountTo = () => {
    if (Object.keys(rates).length !== 0) {
      if (currentBase === fromCurrency) {
        return convertWithBaseCurrency();
      }
      return convertDifferntCurrencies();
    }
  };

  return (
    <div>
      <div className="d-flex flex-row justify-content-center">
        hi
      </div>
      <div className="d-flex flex-row justify-content-center">
        <div
          className="d-inline-flex flex-row justify-content-center flex-wrap rounded p-3 bg-light"
        >
          <div>
            <FromConvertSelect
              selectedCurrency={fromCurrency}
              inputValueFrom={countConvertFrom}
              inputHandleFrom={setCountConvertFrom}
              handlerFromCurrency={setFromCurrency}
            />
          </div>
          <div>
            <ToConvertSelect
              inputHandleTo={convertCountTo}
              handlerFromCurrency={setToCurrency}
              selectedCurrency={toCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
