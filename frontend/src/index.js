import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Init from './Init.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Init>
      <App />
    </Init>
  </React.StrictMode>,
);
