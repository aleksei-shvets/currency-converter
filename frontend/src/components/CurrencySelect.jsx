import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import currencies from '../constatnts/currencies.js';
import { latestThank } from '../store/ratesSlice.js';
import useBaseCurrency from '../contexts/hooks/useBaseCurrency.js';
import { ratesSelectors } from '../store/selectors.js';

const CurrecySelect = () => {
  const currencyHook = useBaseCurrency();
  const currentBase = currencyHook.base;
  const dispatch = useDispatch();
  const [baseCurrency, setBaseCurrency] = useState(currentBase);
  const loadingStatus = useSelector(ratesSelectors.getloadingStatus);

  const selectHandle = async (event) => {
    if (event.target.value !== currentBase) {
      currencyHook.updateBaseCurrency(event.target.value);
      setBaseCurrency(event.target.value);
      await dispatch(latestThank(event.target.value));
    }
  };

  const renderSpinner = () => (
    <div>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className="me-2"
      />
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <div className="d-flex justify-content-center align-items-center">
      {loadingStatus === 'loading' ? renderSpinner() : null}
      <Form.Select
        value={baseCurrency}
        aria-label="Default select example"
        size="sm"
        onChange={selectHandle}
      >
        {currencies.map((currency) => (
          <option key={currency} id={currency} value={currency}>{currency}</option>
        ))}
      </Form.Select>
    </div>
  );
};

export default CurrecySelect;
