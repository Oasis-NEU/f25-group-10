
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { SavedItemsProvider } from './context/SavedItemsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SavedItemsProvider>
      <App />
    </SavedItemsProvider>
  </React.StrictMode>,
);
