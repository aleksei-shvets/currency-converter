/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { convertThunk } from '../store/ratesSlice.js';
import { ratesSelectors } from '../store/selectors.js';
import currencies from '../constatnts/currencies.js';
import getCurrenciesArr from '../helpers/getCurrenciesArr.js';
// import state from '../store/index.js';

const FormConverter = () => {
  const dispatch = useDispatch();
  const [convertedResult, setConvertedResult] = useState(null);
  const [convertCount, setConvertCount] = useState(null);
  const [fetchCurrencies, setFetchCurrencies] = useState({
    baseCurrency: '',
    toCurrency: '',
  });
  const convertRate = useSelector(ratesSelectors.getConvertRate);

  const getErrorsEl = (obj) => {
    const errors = Object.values(obj);
    return errors.map((er) => <div key={er} className="small text-danger">{er}</div>);
  };

  const formik = useFormik({
    initialValues: {
      inputText: '',
    },
    validate: (values) => {
      const errors = {};
      const regex = /^\d+\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;
      const strArr = values.inputText.trim().split(' ');
      if (!regex.test(values.inputText) || strArr.length !== 4) {
        errors.inputText = 'Запрос должен соответствовать примеру.';
      }

      const currenciesArr = getCurrenciesArr(strArr);
      if (!currenciesArr) {
        errors.inputText = 'Неверный формат ввода.';
        return errors;
      }

      const unknownCurrencies = currenciesArr.map((item) => {
        if (currencies.includes(item)) {
          return null;
        }
        return item;
      }).filter(Boolean);

      if (unknownCurrencies.length > 0) {
        errors.unknownCurrencies = unknownCurrencies.join(', ');
      }

      return errors;
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
      } catch (e) {
        return e;
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const ResultEl = () => {
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
    <Form onSubmit={handleSubmit} className="container">
      <Form.Floating>
        <Form.Control
          autoComplete="inputText"
          id="inputText"
          name="inputText"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.inputText}
          onBlur={formik.handleBlur}
          placeholder="10 RUB in USD"
          isInvalid={formik.errors.inputText || formik.errors.unknownCurrencies}
          className="mb-4"
        />
        <Form.Label htmlFor="inputText" className="ms-2">10 RUB in USD</Form.Label>
        <Form.Control.Feedback type="invalid">{formik.errors.inputText}</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">{`Эти валюты не поддерживаются или указаны с ошибкой: ${formik.errors.unknownCurrencies}`}</Form.Control.Feedback>
        {formik.errors ? getErrorsEl(formik.errors) : null}
        <Button className="mb-3" type="submit" disabled={formik.isSubmitting}>Submit</Button>
        <div>
          {convertedResult !== null && ResultEl()}
        </div>
      </Form.Floating>
    </Form>
  );
};

export default FormConverter;
