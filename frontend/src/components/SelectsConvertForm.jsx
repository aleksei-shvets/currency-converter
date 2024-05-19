import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ratesSelectors } from '../store/selectors.js';
import currencies from '../constatnts/currencies.js';
import { convertThunk } from '../store/ratesSlice.js';

const Converter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [convertedResult, setConvertedResult] = useState(null);
  const [convertCount, setConvertCount] = useState(null);

  const convertRate = useSelector(ratesSelectors.getConvertRate);

  useEffect(() => {
    if (convertRate) {
      const result = Math.round((Number(convertCount) * Number(convertRate)) * 100) / 100;
      setConvertedResult(result);
    }
  }, [convertRate, convertCount]);

  const formik = useFormik({
    initialValues: {
      fromCurrency: '',
      toCurrency: '',
      count: '',
    },
    onSubmit: async (values) => {
      try {
        const { count, fromCurrency, toCurrency } = values;
        formik.setSubmitting(true);
        setConvertCount(count);
        if (fromCurrency === toCurrency) {
          setConvertedResult(count);
          return;
        }

        await dispatch(convertThunk({
          baseCurrency: fromCurrency,
          toCurrency,
        }));
      } catch (e) {
        return e;
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div className="p-0">
      <Form
        className="d-flex flex-column justify-content-between rounded p-3 bg-light"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3">
          <div className="d-flex flex-row justify-content-center p-0 mb-2">
            <div className="d-flex flex-row rounded bg-white p-0">
              <div>
                <Form.Label htmlFor="count" className="visually-hidden">Count</Form.Label>
                <Form.Control
                  className="border-0 bg-white"
                  name="count"
                  id="count"
                  value={formik.values.count}
                  type="text"
                  placeholder=""
                  onChange={formik.handleChange}
                  size="md"
                />
              </div>
              <div className="" style={{ minWidth: '100px' }}>
                <Form.Select
                  name="fromCurrency"
                  id="fromCurrency"
                  value={formik.values.fromCurrency}
                  aria-label="Default select example"
                  size="md"
                  onChange={formik.handleChange}
                  className="bg-secondary-subtle"
                >
                  {currencies.map((currency) => (
                    <option key={currency} id={currency} value={currency}>{currency}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </div>

          <div className="d-flex flex-row p-0 mb-2">
            <div className="d-flex flex-row rounded bg-white align-items-center p-0">
              <div>
                <Form.Label htmlFor="toConvert" className="visually-hidden">To Convert</Form.Label>
                <Form.Control
                  className="border-0 bg-white"
                  name="toConvert"
                  id="toConvert"
                  value={convertedResult || ''}
                  type="text"
                  placeholder=""
                  size="md"
                  readOnly
                />
              </div>
              <div className="" style={{ minWidth: '100px' }}>
                <Form.Select
                  value={formik.values.toCurrency}
                  name="toCurrency"
                  id="toCurrency"
                  aria-label="Default select example"
                  size="md"
                  onChange={formik.handleChange}
                  className="bg-secondary-subtle"
                >
                  {currencies.map((currency) => (
                    <option key={currency} id={currency} value={currency}>{currency}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <Button variant="info" className="mb-3" type="submit" disabled={formik.isSubmitting}>{t('buttonNames.convert')}</Button>
        </div>
      </Form>
    </div>
  );
};

export default Converter;
