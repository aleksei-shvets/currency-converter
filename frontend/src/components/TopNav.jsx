import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ROUTES from '../pages/route.js';
import { ratesSelectors } from '../store/selectors.js';
import { show } from '../store/modalSlice.js';
import CurrecySelect from './CurrencySelect.jsx';
import useBaseCurrency from '../contexts/hooks/useBaseCurrency.js';
import { latestThank } from '../store/ratesSlice.js';
import ErrorModal from './ErrorModal.jsx';

const TopNav = () => {
  const dispatch = useDispatch();
  const currencyHook = useBaseCurrency();
  const { t } = useTranslation();
  const [activPage, setActivePage] = useState('/');
  const [showModal, setShowModal] = useState(false);
  const { pathname } = useLocation();
  const err = useSelector(ratesSelectors.getErr);
  const rates = useSelector(ratesSelectors.getRates);

  useEffect(() => {
    if (err) {
      dispatch(show());
      setShowModal(true);
    }
  });

  useEffect(() => {
    const currentBase = currencyHook.base;
    const fetchData = async () => {
      await dispatch(latestThank(currentBase));
    };
    if (Object.keys(rates).length === 0) {
      fetchData();
    }
  }, [currencyHook.base, dispatch, rates]);

  useEffect(() => {
    switch (pathname) {
      case '/':
        setActivePage('/');
        break;
      case '/converter':
        setActivePage('converter');
        break;
      default:
        setActivePage('/');
    }
  }, [pathname]);

  const handleNavItemClick = (path) => {
    setActivePage(path);
  };

  return (
    <>
      <Nav
        variant="underline"
        className="bg-light p-4 d-flex flex-row justify-content-between align-items-center sticky-top mb-3"
        style={{ boxShadow: '0px 12px 9px -6px rgba(34, 60, 80, 0.43)' }}
      >
        <div className="d-flex flex-row align-items-center">
          <Nav.Item className="me-3">
            <Nav.Link
              className={`text-secondary ${activPage === '/' ? 'active' : ''}`}
              onClick={() => handleNavItemClick('/')}
              href={ROUTES.currencyList}
            >
              {t('headers.currencies')}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="me-3">
            <Nav.Link
              className={`text-secondary ${activPage === 'converter' ? 'active' : ''}`}
              onClick={() => handleNavItemClick('converter')}
              href={ROUTES.converter}
            >
              {t('headers.converter')}
            </Nav.Link>
          </Nav.Item>
        </div>
        <Nav.Item>
          <CurrecySelect />
        </Nav.Item>
      </Nav>
      {showModal && <ErrorModal />}
    </>
  );
};

export default TopNav;
