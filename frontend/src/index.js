import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthProv } from "./AuthProv";

// Stylesheets
import './index.css'

// Context
import { PageContextProvider } from './context/PageContext'
import reducer, { initialState } from './context/Reducer'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PageContextProvider initialState={initialState} reducer={reducer}>
      <AuthProv>
        <App />
      </AuthProv>
    </PageContextProvider>
  </React.StrictMode>
);
