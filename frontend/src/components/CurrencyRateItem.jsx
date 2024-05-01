const CurrencyRateItem = ({
  baseCurrency, currencyCode, fullName, rate,
}) => (
  <div className="d-flex flex-row align-items-center border-bottom mt-3">
    <div className="d-flex flex-row align-items-center flex-grow-1">
      <div className="me-2">
        <strong>
          {`${baseCurrency} / ${currencyCode}`}
        </strong>
      </div>
      <div>{`(${fullName})`}</div>
    </div>
    <div className="">{rate}</div>
  </div>
);

export default CurrencyRateItem;
