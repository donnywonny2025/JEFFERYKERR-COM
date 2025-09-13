import React from 'react';
import { TextShimmer } from '../../motion-primitives/text-shimmer';
import { SafeWrapper } from '../../SafeWrapper';
import { DigitalClock } from '../../motion-primitives/digital-clock';
import Menu from '../Menu/Menu';
import { TYPOGRAPHY, Z_INDEX, NAV_LINKS } from '../../styles/theme';
import './Header.css';

const Header = ({ menuOpen, setMenuOpen, onNavigate }) => {
  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <a href="#" onClick={handleLogoClick} className="logo">
          <TextShimmer duration={3} spread={1.5} fontSize="36px">
            <span className="logo-k">k</span>err
          </TextShimmer>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate(link.label.toLowerCase());
                }
              }}
              className={link.className || ''}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side container */}
        <div className="header-right">
          {/* Digital Clock */}
          <SafeWrapper>
            <DigitalClock />
          </SafeWrapper>

          {/* Hamburger Menu */}
          <Menu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;