// import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

// Depois, vou adicionar o ---> <React.StricMode>

// <React.StrictMode>
//   <App />
// </React.StrictMode>
