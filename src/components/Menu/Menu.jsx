import React from 'react';
import { COLORS, TYPOGRAPHY, MENU_CONFIG } from '../../styles/theme';
import './Menu.css';

const Menu = ({ menuOpen, setMenuOpen, onNavigate }) => {
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (action) => {
    toggleMenu();
    if (onNavigate) {
      onNavigate(action);
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        onMouseEnter={(e) => {
          const spans = e.currentTarget.querySelectorAll('span');
          spans.forEach(span => {
            span.style.background = COLORS.TEXT_PRIMARY;
          });
        }}
        onMouseLeave={(e) => {
          const spans = e.currentTarget.querySelectorAll('span');
          spans.forEach(span => {
            span.style.background = '#a1a1aa';
          });
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Simple Menu Overlay */}
      {menuOpen && (
        <div className="simple-menu-overlay" onClick={toggleMenu}>
          <div className="simple-menu-content" onClick={(e) => e.stopPropagation()}>
            <nav className="simple-menu-nav">
              {MENU_CONFIG.ITEMS.map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => handleMenuClick(item.toLowerCase())}
                  className="simple-menu-item"
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="simple-menu-email">
              <a href={`mailto:${MENU_CONFIG.EMAIL}`}>{MENU_CONFIG.EMAIL}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;