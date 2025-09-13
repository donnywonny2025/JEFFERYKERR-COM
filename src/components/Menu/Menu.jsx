import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { COLORS, TYPOGRAPHY, MENU_CONFIG } from '../../styles/theme';
import './Menu.css';

const Menu = React.memo(({ menuOpen, setMenuOpen, onNavigate }) => {
  const spansRef = useRef([]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen, setMenuOpen]);

  const handleMenuClick = useCallback((action) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(action);
    }
  }, [setMenuOpen, onNavigate]);

  const handleMouseEnter = useCallback(() => {
    spansRef.current.forEach(span => {
      if (span) span.style.background = COLORS.TEXT_PRIMARY;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    spansRef.current.forEach(span => {
      if (span) span.style.background = '#a1a1aa';
    });
  }, []);

  const setSpanRef = useCallback((index) => (el) => {
    spansRef.current[index] = el;
  }, []);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span ref={setSpanRef(0)}></span>
        <span ref={setSpanRef(1)}></span>
        <span ref={setSpanRef(2)}></span>
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
});

Menu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  onNavigate: PropTypes.func
};

export default Menu;