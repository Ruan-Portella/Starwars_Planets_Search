import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppProvider from './context/AppProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <AppProvider>
      <App />
    </AppProvider>,
  );
