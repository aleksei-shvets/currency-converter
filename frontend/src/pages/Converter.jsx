/* eslint-disable consistent-return */
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ratesSelectors } from '../store/selectors.js';
import FromConvertSelect from '../components/FromConvertInput.jsx';
import ToConvertSelect from '../components/ToConvertInput.jsx';
import state from '../store/index.js';

const Converter = () => {
  const [rates, setRates] = useState({});
  const stateRates = useSelector(ratesSelectors.getRates);
  const currentBase = useSelector(ratesSelectors.getBaseCurrency);
  const [fromCurrency, setFromCurrency] = useState(currentBase);
  const [toCurrency, setToCurrency] = useState(currentBase);
  const [countConvertFrom, setCountConvertFrom] = useState(1);

  useEffect(() => {
    console.log(state.getState());
    setRates(stateRates);
    console.log(rates);
  }, [stateRates]);

  const convertWithBaseCurrency = () => {
    const rate = rates[toCurrency];
    return Number(countConvertFrom) * Number(rate);
  };

  const convertDifferntCurrencies = () => {
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    console.log((Number(countConvertFrom) * Number(fromRate)) * Number(toRate));
    return (Number(countConvertFrom) * Number(fromRate)) * Number(toRate);
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
  );
};

export default Converter;
