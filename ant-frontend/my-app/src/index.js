import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from './context/ConfigContext';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);