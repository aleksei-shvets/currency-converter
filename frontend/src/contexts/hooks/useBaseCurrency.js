import { useContext } from 'react';
import baseCurrencyContext from '../baseCurrencyContext.js';

const baseCurrencyHook = () => useContext(baseCurrencyContext);

export default baseCurrencyHook;
