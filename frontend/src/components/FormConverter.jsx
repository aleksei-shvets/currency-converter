import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { convertThunk } from '../store/ratesSlice.js';
import { ratesSelectors } from '../store/selectors.js';
import currencies from '../constatnts/currencies.js';
import getCurrenciesArr from '../helpers/getCurrenciesArr.js';

const FormConverter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeForm, setActiveForm] = useState(false); // State to track active form focus
  const [convertedResult, setConvertedResult] = useState(null);
  const [convertCount, setConvertCount] = useState(null);
  const [fetchCurrencies, setFetchCurrencies] = useState({
    baseCurrency: '',
    toCurrency: '',
  });
  const convertRate = useSelector(ratesSelectors.getConvertRate);

  const loadingStatus = useSelector(ratesSelectors.getStatusConvertThunk);

  const getErrorsEl = (obj) => {
    const errors = Object.values(obj);
    return (
      <div className="mb-3">
        {errors.map((er) => <div key={er} className="small text-danger">{er}</div>)}
      </div>
    );
  };

  const formik = useFormik({
    initialValues: {
      inputText: '',
    },
    validate: (values) => {
      if (activeForm) { // Validate only if this form is active
        const errors = {};
        const regex = /^\d+\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;
        const strArr = values.inputText.trim().split(' ');

        if (!regex.test(values.inputText) || strArr.length !== 4) {
          errors.inputText = t('errorMessages.incorrectFetch');
          return errors;
        }

        const currenciesArr = getCurrenciesArr(strArr);
        if (currenciesArr.length > 0) {
          const unknownCurrencies = currenciesArr.map((item) => {
            if (currencies.includes(item)) {
              return null;
            }
            return item;
          }).filter(Boolean);

          if (unknownCurrencies.length > 0) {
            errors.unknownCurrencies = `${t('errorMessages.unknownCurrencies')} ${unknownCurrencies.join(', ')}`;
          }
        }

        return errors;
      }
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        const strArr = values.inputText.trim().split(' ');
        const [count, fromCurrency, , toCurrency] = strArr;
        setConvertCount(count);
        setFetchCurrencies({
          baseCurrency: fromCurrency.toUpperCase(),
          toCurrency: toCurrency.toUpperCase(),
        });

        await dispatch(convertThunk({
          baseCurrency: fromCurrency.toUpperCase(),
          toCurrency: toCurrency.toUpperCase(),
        }));
        formik.resetForm();
      } catch (e) {
        return e;
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const resultEl = () => {
    if (convertedResult) {
      return (
        <div>
          {`${convertCount} ${fetchCurrencies.baseCurrency} = ${convertedResult} ${fetchCurrencies.toCurrency}`}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (convertRate) {
      const result = Math.round((Number(convertCount) * Number(convertRate)) * 100) / 100;
      setConvertedResult(result);
    }
  }, [convertRate, convertCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await formik.validateForm();
    formik.setTouched({
      inputText: true,
    });
    if (!Object.keys(errors).length) {
      formik.handleSubmit();
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="container"
      onFocus={() => setActiveForm(true)}
      onBlur={() => setActiveForm(false)}
    >
      <Form.Floating>
        <Form.Control
          autoComplete="inputText"
          id="inputText"
          name="inputText"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.inputText}
          onBlur={formik.handleBlur}
          placeholder={t('placeholders.fetchText')}
          isInvalid={!!(formik.errors.inputText
            || formik.errors.unknownCurrencies)
            && formik.touched.inputText}
          className="mb-4"
        />
        <Form.Label htmlFor="inputText" className="ms-2 text-body-tertiary">{t('placeholders.fetchText')}</Form.Label>
        {getErrorsEl(formik.errors)}
        <div className="d-flex align-items-center">
          <Button variant="info" className="me-3" type="submit" disabled={formik.isSubmitting}>{t('buttonNames.convert')}</Button>
          {loadingStatus === 'loading' ? <div className="align-self-center me-3"><Spinner size="sm" /></div> : null}
          <div>
            {convertedResult !== null && resultEl()}
          </div>
        </div>
      </Form.Floating>
    </Form>
  );
};

export default FormConverter;
