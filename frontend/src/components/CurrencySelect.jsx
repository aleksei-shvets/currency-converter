import Form from 'react-bootstrap/Form';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import currencies from '../constatnts/currencies.js';
import { latestThank, updateBaseCurrency } from '../store/ratesSlice.js';
import ratesSelectors from '../store/selectors.js';

const CurrecySelect = () => {
  const base = useSelector(ratesSelectors.getBaseCurrency);
  const dispatch = useDispatch();

  const selectHandle = async (event) => {
    dispatch(updateBaseCurrency(event.target.value));
    await dispatch(latestThank(event.target.value));
  };

  console.log(base);

  return (
    <Form.Select
      value={useSelector(ratesSelectors.getBaseCurrency)}
      aria-label="Default select example"
      size="sm"
      onChange={selectHandle}
    >
      {currencies.map((currency) => (
        <option key={currency} id={currency} value={currency}>{currency}</option>
      ))}
    </Form.Select>
  );
};

export default CurrecySelect;
