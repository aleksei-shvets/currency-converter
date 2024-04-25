/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import ROUTES from './pages/route.js';
import CurrencyList from './pages/CurrencyList.jsx';
import Converter from './pages/Converter.jsx';
// import TabProvider from './providers/tabProvider.js';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.currencyList} element={<CurrencyList />} />
      <Route path={ROUTES.converter} element={<Converter />} />
    </Routes>
  </BrowserRouter>
);

export default App;
