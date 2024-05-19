import { useTranslation } from 'react-i18next';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import CurrencyRateItem from '../components/CurrencyRateItem.jsx';
import { ratesSelectors } from '../store/selectors.js';
import baseCurrencyHook from '../contexts/hooks/useBaseCurrency.js';

const Home = () => {
  const useBaseCurrency = baseCurrencyHook();
  const loadingStatus = useSelector(ratesSelectors.getStatusLatestThunk);

  const rates = useSelector(ratesSelectors.getRates);

  const { t } = useTranslation();
  const baseCurrency = useBaseCurrency.base;
  console.log(baseCurrency);
  const keys = Object.keys(rates) ? Object.keys(rates) : {};
  if (loadingStatus === 'loading') {
    return (
      <div
        className="m-5 p-5 d-flex justify-content-center"
      >
        <div>
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="px-5 container rounded p-3 bg-light">
      {keys.length !== 0 ? keys.map((key) => <CurrencyRateItem baseCurrency={baseCurrency} key={key} rate={rates[key]} currencyCode={key} fullName={t(`symbols.${key}`)} />) : null}
    </div>
  );
};

export default Home;
