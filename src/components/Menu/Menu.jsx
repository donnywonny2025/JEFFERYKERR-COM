import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { COLORS, TYPOGRAPHY, MENU_CONFIG } from '../../styles/theme';
import './Menu.css';

const Menu = React.memo(({ menuOpen, setMenuOpen, onNavigate }) => {
  const spansRef = useRef([]);
  const containerRef = useRef(null);

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

  // Close on click outside and on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick, true);
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('mousedown', handleClick, true);
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <div className="hamburger-container" ref={containerRef}>
      {/* Hamburger Button */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
      >
        <span ref={setSpanRef(0)}></span>
        <span ref={setSpanRef(1)}></span>
        <span ref={setSpanRef(2)}></span>
      </button>

      {/* Anchored dropdown menu */}
      {menuOpen && (
        <div className="dropdown-menu" role="menu">
          <div className="simple-menu-content" onClick={(e) => e.stopPropagation()}>
            <nav className="simple-menu-nav">
              {MENU_CONFIG.ITEMS.map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => handleMenuClick(item.toLowerCase())}
                  className="simple-menu-item"
                  role="menuitem"
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
    </div>
  );
});

Menu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  onNavigate: PropTypes.func
};

export default Menu;