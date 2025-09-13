import React from 'react';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from '../../motion-primitives/morphing-dialog';
import { COLORS, TYPOGRAPHY, ANIMATIONS, Z_INDEX, MENU_CONFIG } from '../../styles/theme';
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
    <MorphingDialog>
      <MorphingDialogTrigger
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          width: '40px',
          height: '40px',
          transition: `all ${ANIMATIONS.DURATION.FAST} ${ANIMATIONS.EASING.DEFAULT}`,
        }}
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
        <span style={{
          display: 'block',
          height: '2px',
          background: '#a1a1aa',
          width: '100%',
          transition: `background-color ${ANIMATIONS.DURATION.FAST} ${ANIMATIONS.EASING.DEFAULT}`
        }}></span>
        <span style={{
          display: 'block',
          height: '2px',
          background: '#a1a1aa',
          width: '100%',
          transition: `background-color ${ANIMATIONS.DURATION.FAST} ${ANIMATIONS.EASING.DEFAULT}`
        }}></span>
        <span style={{
          display: 'block',
          height: '2px',
          background: '#a1a1aa',
          width: '100%',
          transition: `background-color ${ANIMATIONS.DURATION.FAST} ${ANIMATIONS.EASING.DEFAULT}`
        }}></span>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: '12px',
            maxWidth: '320px',
            width: '320px',
          }}
          className='pointer-events-auto relative flex h-auto flex-col overflow-hidden border border-zinc-950/10 bg-black'
        >
          <div className="dialog-video-container" style={{
            height: '160px',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '12px 12px 0 0'
          }}>
            <iframe
              src={`${MENU_CONFIG.VIDEO_URL}?autoplay=1&muted=1&loop=1&background=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={MENU_CONFIG.VIDEO_TITLE}
              style={{
                width: '100%',
                height: '100%',
                transform: 'scale(1.8)',
                transformOrigin: 'center center'
              }}
            ></iframe>
          </div>
          <div className='py-8 px-6'>
            <nav className='menu-nav'>
              {MENU_CONFIG.ITEMS.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => handleMenuClick(item.toLowerCase())}
                  className='menu-nav-item'
                  style={{
                    fontFamily: TYPOGRAPHY.FONT_FAMILY.PRIMARY,
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="menu-email">
              <a href={`mailto:${MENU_CONFIG.EMAIL}`}>{MENU_CONFIG.EMAIL}</a>
            </div>
          </div>
          <MorphingDialogClose className='text-zinc-50' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

export default Menu;