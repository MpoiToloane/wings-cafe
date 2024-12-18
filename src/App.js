import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import './App.css';
import logo from './images/logo.jpg'; 

const App = () => {
  return (
    <>
      <Router>
        <header>
          <nav className="navbar">
            <div className="navbar-container">
              <div className="logo-container">
                <img src={logo} alt="Chrissy's Cafe Logo" className="logo-image" />
                <h1 className="logo-text">Chrissy's Cafe</h1>
              </div>
              <div className="nav-links">
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to="/"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to="/products"
                >
                  Product Management
                </NavLink>
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to="/users"
                >
                  User Management
                </NavLink>
              </div>
            </div>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 Chrissy's Cafe. All rights reserved.</p>
        </footer>
      </Router>
    </>
  );
};


export default App;
