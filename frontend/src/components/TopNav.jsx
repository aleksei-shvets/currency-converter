import Nav from 'react-bootstrap/Nav';
// import { useState } from 'react';
import ROUTES from '../pages/route.js';
// import useTabHook from '../contexts/hooks/tabHook.js';
import Container from '../containers/mainContainer.jsx';

const TopNav = ({ currentTab }) => (
  <Container>
    <Nav
      variant="underline"
      activeKey={currentTab}
      className="bg-light p-4"
    >
      <Nav.Item>
        <Nav.Link className="text-secondary" id="currencyList" eventKey="currencyList" href={ROUTES.currencyList}>Currency List</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="text-secondary" id="converter" eventKey="converter" href={ROUTES.converter}>Converter</Nav.Link>
      </Nav.Item>
    </Nav>
  </Container>
);

export default TopNav;
