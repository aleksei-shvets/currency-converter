import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
// import { useState } from 'react';
import ROUTES from '../pages/route.js';
// import useTabHook from '../contexts/hooks/tabHook.js';
// import Container from '../containers/mainContainer.jsx';

const TopNav = ({ currentTab }) => {
  const { t } = useTranslation();
  return (
    <Nav
      variant="underline"
      activeKey={currentTab}
      className="bg-light p-4"
    >
      <Nav.Item>
        <Nav.Link className="text-secondary" id="currencyList" eventKey="currencyList" href={ROUTES.currencyList}>{t('headers.currencies')}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="text-secondary" id="converter" eventKey="converter" href={ROUTES.converter}>{t('headers.converter')}</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default TopNav;
