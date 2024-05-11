import Form from 'react-bootstrap/Form';
import currencies from '../constatnts/currencies.js';

const ToConvertSelect = ({
  inputHandleTo, handlerFromCurrency, selectedCurrency,
}) => {
  const selectHandle = (event) => handlerFromCurrency(event.target.value);

  return (
    <div className="d-flex flex-row align-items-center p-0 mb-2">
      <Form className="d-flex flex-row rounded bg-white align-items-center p-0">
        <div>
          <Form.Label htmlFor="toConvert" className="visually-hidden">sdfsd</Form.Label>
          <Form.Control
            className="border-0 bg-white"
            name="toConvert"
            id="toConvert"
            value={inputHandleTo()}
            type="text"
            placeholder=""
            size="md"
            readOnly
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
    </div>
  );
};

export default ToConvertSelect;
