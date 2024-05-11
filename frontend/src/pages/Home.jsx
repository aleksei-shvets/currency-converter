import { useTranslation } from 'react-i18next';
import Spinner from 'react-bootstrap/Spinner';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CurrencyRateItem from '../components/CurrencyRateItem.jsx';
import { ratesSelectors } from '../store/selectors.js';
// import { latestThank } from '../store/ratesSlice.js';
// import useBaseCurrency from '../contexts/hooks/useBaseCurrency.js';

/* const fakeData = {
  AED: 0.039311,
  AFN: 0.780978,
  ALL: 1.01037,
  AMD: 4.179054,
  ANG: 0.019419,
  AOA: 8.927103,
  ARS: 9.433349,
  AUD: 0.016518,
  AWG: 0.019279,
  AZN: 0.018237,
  BAM: 0.019644,
  BBD: 0.021755,
  BDT: 1.182503,
  BGN: 0.01962,
  BHD: 0.004063,
  BIF: 30.895615,
  BMD: 0.010703,
  BND: 0.014665,
  BOB: 0.074453,
  BRL: 0.055611,
  BSD: 0.010775,
  BTC: 1.86879e-7,
  BTN: 0.899258,
  BWP: 0.152941,
  BYN: 0.035261,
  BYR: 209.782492,
  BZD: 0.021719,
  CAD: 0.014743,
  CDF: 29.968926,
  CHF: 0.009854,
  CLF: 0.000372,
  CLP: 10.253758,
  CNH: 0.077525,
  CNY: 0.077497,
  COP: 41.74008,
  CRC: 5.47769,
  CUC: 0.010703,
  CUP: 0.283634,
  CVE: 1.10746,
  CZK: 0.25227,
  DJF: 1.918698,
  DKK: 0.074794,
  DOP: 0.630326,
  DZD: 1.44294,
  EGP: 0.512369,
  ERN: 0.160548,
  ETB: 0.618592,
  EUR: 0.010027,
  FJD: 0.024689,
  FKP: 0.008592,
  GBP: 0.008568,
  GEL: 0.028631,
  GGP: 0.008592,
  GHS: 0.147079,
  GIP: 0.008592,
  GMD: 0.725409,
  GNF: 92.590428,
  GTQ: 0.083752,
  GYD: 2.255497,
  HKD: 0.08374,
  HNL: 0.266137,
  HRK: 0.07578,
  HTG: 1.428779,
  HUF: 3.91856,
  IDR: 173.98996,
  ILS: 0.039987,
  IMP: 0.008592,
  INR: 0.893529,
  IQD: 14.112925,
  IRR: 450.336654,
  ISK: 1.503367,
  JEP: 0.008592,
  JMD: 1.682051,
  JOD: 0.007585,
  JPY: 1.69021,
  KES: 1.427701,
  KGS: 0.949181,
  KHR: 43.809464,
  KMF: 4.939572,
  KPW: 9.632873,
  KRW: 14.831437,
  KWD: 0.003299,
  KYD: 0.008977,
  KZT: 4.76861,
  LAK: 229.8641,
  LBP: 965.037525,
  LKR: 3.194917,
  LRD: 2.070014,
  LSL: 0.201429,
  LTL: 0.031604,
  LVL: 0.006474,
  LYD: 0.052477,
  MAD: 0.10892,
  MDL: 0.190172,
  MGA: 47.806078,
  MKD: 0.61877,
  MMK: 22.626855,
  MNT: 36.926004,
  MOP: 0.086805,
  MRU: 0.424865,
  MUR: 0.496308,
  MVR: 0.165475,
  MWK: 18.676509,
  MXN: 0.183308,
  MYR: 0.051027,
  MZN: 0.679635,
  NAD: 0.201432,
  NGN: 14.984357,
  NIO: 0.396615,
  NOK: 0.118901,
  NPR: 1.438812,
  NZD: 0.018168,
  OMR: 0.004125,
  PAB: 0.010775,
  PEN: 0.040327,
  PGK: 0.04159,
  PHP: 0.618136,
  PKR: 2.99864,
  PLN: 0.043526,
  PYG: 80.518219,
  QAR: 0.03897,
  RON: 0.049899,
  RSD: 1.17459,
  RUB: 1,
  RWF: 13.912975,
  SAR: 0.040143,
  SBD: 0.090752,
  SCR: 0.146711,
  SDG: 6.272066,
  SEK: 0.117857,
  SGD: 0.014604,
  SHP: 0.013523,
  SLE: 0.244539,
  SLL: 224.440548,
  SOS: 6.116896,
  SRD: 0.361912,
  STD: 221.53439,
  SVC: 0.094264,
  SYP: 26.892086,
  SZL: 0.20128,
  THB: 0.397891,
  TJS: 0.117644,
  TMT: 0.037568,
  TND: 0.033705,
  TOP: 0.025562,
  TRY: 0.347348,
  TTD: 0.073136,
  TWD: 0.349053,
  TZS: 27.906296,
  UAH: 0.425711,
  UGX: 41.078421,
  USD: 0.010703,
  UYU: 0.412884,
  UZS: 35.976792,
  VEF: 38772.862215,
  VES: 0.3894,
  VND: 271.27231,
  VUV: 1.270704,
  WST: 0.030008,
  XAF: 6.587969,
  XAG: 0.000405,
  XAU: 0.000004676158,
  XCD: 0.028926,
  XDR: 0.008175,
  XOF: 6.588062,
  XPF: 1.194391,
  YER: 2.679811,
  ZAR: 0.200184,
  ZMK: 96.341355,
  ZMW: 0.288498,
  ZWL: 3.446422,
}; */

const Home = () => {
  const loadingStatus = useSelector(ratesSelectors.getloadingStatus);

  const rates = useSelector(ratesSelectors.getRates);

  const { t } = useTranslation();
  const baseCurrency = useSelector(ratesSelectors.getBaseCurrency);
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
    <div className="px-5">
      {keys.length !== 0 ? keys.map((key) => <CurrencyRateItem baseCurrency={baseCurrency} key={key} rate={rates[key]} currencyCode={key} fullName={t(`symbols.${key}`)} />) : null}
    </div>
  );
};

export default Home;
