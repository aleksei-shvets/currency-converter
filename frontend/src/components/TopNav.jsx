import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
// import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ROUTES from '../pages/route.js';
import { ratesSelectors } from '../store/selectors.js';
import { show } from '../store/modalSlice.js';

// import Container from '../containers/mainContainer.jsx';
import CurrecySelect from './CurrencySelect.jsx';
import useBaseCurrency from '../contexts/hooks/useBaseCurrency.js';
import { latestThank } from '../store/ratesSlice.js';
import ErrorModal from './ErrorModal.jsx';

const TopNav = () => {
  // const isShowModal = useSelector(modalSelectors.getModalStatus);
  const dispatch = useDispatch();
  const currencyHook = useBaseCurrency();
  const { t } = useTranslation();
  const [activPage, setActivePage] = useState('/');
  const { pathname } = useLocation();
  const err = useSelector(ratesSelectors.getErr);

  const getErrModal = () => {
    if (err === '429') {
      dispatch(show());
      return <ErrorModal />;
    }
    return null;
  };

  const rates = useSelector(ratesSelectors.getRates);

  useEffect(() => {
    const currentBase = currencyHook.base;
    const fetchData = async () => {
      await dispatch(latestThank(currentBase));
    };
    if (Object.keys(rates).length === 0) {
      fetchData();
    }
  }, []);

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
  }, [activPage]);

  return (
    <>
      <Nav
        variant="underline"
        activeKey={activPage}
        className="bg-light p-4 d-flex flex-row align-items-center sticky-top mb-3"
      >
        <div className="d-flex flex-row align-items-center flex-grow-1">
          <Nav.Item className="me-3">
            <Nav.Link className="text-secondary" id="currencyList" eventKey="/" href={ROUTES.currencyList}>{t('headers.currencies')}</Nav.Link>
          </Nav.Item>
          <Nav.Item className="me-3">
            <Nav.Link className="text-secondary" id="converter" eventKey="converter" href={ROUTES.converter}>{t('headers.converter')}</Nav.Link>
          </Nav.Item>
        </div>
        <Nav.Item>
          <CurrecySelect />
        </Nav.Item>
      </Nav>
      {err ? getErrModal() : null}
    </>
  );
};

export default TopNav;
