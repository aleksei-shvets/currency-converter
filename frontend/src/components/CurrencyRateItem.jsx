const calculate = (rate) => Math.round(100 * Number(rate)) / 100;

const CurrencyRateItem = ({
  baseCurrency, currencyCode, fullName, rate,
}) => (
  <div className="d-flex flex-row align-items-center border-bottom mt-3">
    <div className="d-flex flex-row align-items-center flex-grow-1">
      <div className="me-2">{`1 ${baseCurrency}`}</div>
      <div className="me-2">=</div>
      <div className="me-2">{calculate(rate)}</div>
      <div className="me-2">{currencyCode}</div>
    </div>
    <div className="small d-flex flex-row align-items-center">
      <div className="me-2">
        <strong>
          {`${currencyCode}`}
        </strong>
      </div>
      <div className="me-2">{`(${fullName})`}</div>
      <div className="">
        <strong>
          {rate}
        </strong>
      </div>
    </div>
  </div>
);

export default CurrencyRateItem;
