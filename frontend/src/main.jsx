import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Suspense fallback={<div role="status" style={{padding:32}}>Loading JCRingforlife…</div>}><App /></Suspense>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

