// index.js
// --------
// This is the ENTRY POINT of the React application.
// When we run "npm start", this file runs first.
// It takes our App component and puts it inside the HTML page
// at the <div id="root"> element in public/index.html.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// createRoot connects React to the HTML page.
// It finds the div with id="root" and renders our App inside it.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// This is for measuring performance. We can ignore it for now.
reportWebVitals();
