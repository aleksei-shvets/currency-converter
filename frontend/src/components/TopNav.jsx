import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
// import { useState } from 'react';
import ROUTES from '../pages/route.js';
// import useTabHook from '../contexts/hooks/tabHook.js';
// import Container from '../containers/mainContainer.jsx';
import CurrecySelect from './CurrencySelect.jsx';

const TopNav = ({ currentTab }) => {
  const { t } = useTranslation();
  return (
    <Nav
      variant="underline"
      activeKey={currentTab}
      className="bg-light p-4 d-flex flex-row align-items-center sticky-top"
    >
      <div className="d-flex flex-row align-items-center flex-grow-1">
        <Nav.Item className="me-3">
          <Nav.Link className="text-secondary" id="currencyList" eventKey="currencyList" href={ROUTES.currencyList}>{t('headers.currencies')}</Nav.Link>
        </Nav.Item>
        <Nav.Item className="me-3">
          <Nav.Link className="text-secondary" id="converter" eventKey="converter" href={ROUTES.converter}>{t('headers.converter')}</Nav.Link>
        </Nav.Item>
      </div>
      <Nav.Item>
        <CurrecySelect />
      </Nav.Item>
    </Nav>
  );
};

export default TopNav;
