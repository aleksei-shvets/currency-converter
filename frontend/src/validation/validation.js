import * as yup from 'yup';

export default (t) => {
  const message = t('errorMessages.positiveNum');
  return yup.object().shape({
    count: yup
      .number()
      .transform((_, originalValue) => {
        const parsed = parseFloat(originalValue);
        return Number.isNaN(parsed) ? NaN : parsed;
      })
      .typeError(message)
      .positive(message),
  });
};
