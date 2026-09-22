import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SitePasswordGate } from './components/auth/SitePasswordGate';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SitePasswordGate>
      <App />
    </SitePasswordGate>
  </React.StrictMode>,
);
