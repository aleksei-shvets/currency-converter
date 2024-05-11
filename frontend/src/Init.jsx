import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import resources from './locales/index.js';
import Container from './containers/mainContainer.jsx';
import store from './store/index.js';
import BaseCurrencyProvider from './providers/BaseCurrencyProvider.js';

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
  <BaseCurrencyProvider>
    <I18nextProvider>
      <Provider store={store}>
        <Container>
          {children}
        </Container>
      </Provider>
    </I18nextProvider>
  </BaseCurrencyProvider>
);

export default Init;
