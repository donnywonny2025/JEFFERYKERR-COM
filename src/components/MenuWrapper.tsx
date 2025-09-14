import React from 'react';
import Menu from './Menu/Menu';

// Thin wrapper to keep the public API consistent
const MenuWrapper: React.FC<any> = (props) => {
  // @ts-ignore - Menu is JS
  return <Menu {...props} />;
};

export default MenuWrapper;
