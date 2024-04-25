import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import resources from './locales/index.js';

i18next
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

const Init = ({ children }) => (
  <I18nextProvider>
    {children}
  </I18nextProvider>
);

export default Init;