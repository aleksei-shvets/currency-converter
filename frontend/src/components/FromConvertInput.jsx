import Form from 'react-bootstrap/Form';
import currencies from '../constatnts/currencies.js';

const imgArrow = require('../assets/img/icons8-arrow-48.png');

const FromConvertSelect = ({
  inputHandleFrom, handlerFromCurrency, inputValueFrom, selectedCurrency,
}) => {
  const selectHandle = (event) => handlerFromCurrency(event.target.value);

  const inputHandle = (e) => {
    inputHandleFrom(e.target.value);
  };

  return (
    <div className="d-flex flex-row align-items-center p-0 me-3 mb-5">
      <Form className="d-flex flex-row rounded align-items-center p-0 me-1 bg-white">
        <div>
          <Form.Label htmlFor="fromConvert" className="visually-hidden">sdfsd</Form.Label>
          <Form.Control
            className="border-0 bg-white"
            name="fromConvert"
            id="fromConvert"
            value={inputValueFrom}
            type="text"
            placeholder=""
            onChange={inputHandle}
            size="md"
          />
        </div>
        <div className="" style={{ minWidth: '100px' }}>
          <Form.Select
            value={selectedCurrency}
            aria-label="Default select example"
            size="md"
            onChange={selectHandle}
            className="bg-secondary-subtle"
          >
            {currencies.map((currency) => (
              <option key={currency} id={currency} value={currency}>{currency}</option>
            ))}
          </Form.Select>
        </div>
      </Form>
      <div>
        <img src={imgArrow} alt="arrow" style={{ maxWidth: '20px' }} />
      </div>
    </div>
  );
};

export default FromConvertSelect;
