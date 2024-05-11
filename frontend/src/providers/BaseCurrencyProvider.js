import { useState, useMemo } from 'react';
import baseCurrencyContext from '../contexts/baseCurrencyContext';
import defaultCurrency from '../constatnts/defaultCurrency';

const baseCurrencyProvider = ({ children }) => {
  const currentBase = localStorage.getItem('baseCurrency');
  const initBase = () => {
    if (!currentBase) {
      return defaultCurrency;
    }
    return localStorage.getItem('baseCurrency');
  };

  const [base, setBase] = useState(initBase);

  const updateBaseCurrency = (newBase) => {
    if (newBase !== currentBase) {
      localStorage.setItem('baseCurrency', newBase);
      setBase(newBase);
    }
  };

  const props = useMemo(() => (
    { base, updateBaseCurrency }
  ), [base, updateBaseCurrency]);

  return (
    <baseCurrencyContext.Provider value={props}>
      {children}
    </baseCurrencyContext.Provider>
  );
};

export default baseCurrencyProvider;
