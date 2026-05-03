import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogIn, LogOut, ShoppingBag, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useCart } from '../../contexts/CartContext.jsx';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const { totals } = useCart();

  const closeMenu = () => {};

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">C</span>
          <span>CartCraft</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" onClick={closeMenu}>
            Products
          </NavLink>
          <NavLink className="cart-link" to="/cart" onClick={closeMenu}>
            <ShoppingBag size={18} />
            Cart
            <span className="cart-count">{totals.count}</span>
          </NavLink>

          {user ? (
            <button className="text-button" type="button" onClick={() => { logout(); closeMenu(); }}>
              <LogOut size={18} />
              Sign out
            </button>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu}>
                <LogIn size={18} />
                Login
              </NavLink>
              <NavLink className="register-link" to="/register" onClick={closeMenu}>
                <UserPlus size={18} />
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
