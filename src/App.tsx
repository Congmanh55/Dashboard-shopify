import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './app/pages/NavBar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './app/pages/NavBar';
import Dashboard from './app/pages/Dashboard';
import Products from './app/pages/Products';
import Setting from './app/pages/Setting';
import './i18n';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

function App() {
  return (
    <AppProvider i18n={{}}>
      <Router >
        <div className="app">
          <div className='navbar'>
            <NavBar />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>

  );
}

export default App;
