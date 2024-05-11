import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import ROUTES from './pages/route.js';
import Home from './pages/Home.jsx';
import Converter from './pages/Converter.jsx';
import TopNav from './components/TopNav.jsx';

const App = () => (
  <BrowserRouter>
    <TopNav />
    <Routes>
      <Route path={ROUTES.currencyList} element={<Home />} />
      <Route path={ROUTES.converter} element={<Converter />} />
    </Routes>
  </BrowserRouter>
);

export default App;
