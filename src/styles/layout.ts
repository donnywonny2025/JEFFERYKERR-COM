import type React from 'react';

// Centralized layout constants
export const HEADER_MAX_WIDTH = 1050; // px
export const HEADER_PADDING_X = 60;   // px

export const OUTER_MAX_WIDTH = 1200;  // px
export const OUTER_PADDING_X = 24;    // px

export const COLUMN_MAX_WIDTH = 750;  // px
export const COLUMN_PADDING_X = 20;   // px

export const FIRST_SECTION_TOP_PADDING = 140; // px

// Reusable style helpers
export const headerContentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: `${HEADER_MAX_WIDTH}px`,
  margin: '0 auto',
  padding: `0 ${HEADER_PADDING_X}px`,
};

export const outerContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: `${OUTER_MAX_WIDTH}px`,
  padding: `0 ${OUTER_PADDING_X}px`,
  margin: '0 auto',
};

export const columnStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: `${COLUMN_MAX_WIDTH}px`,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: `${COLUMN_PADDING_X}px`,
  paddingRight: `${COLUMN_PADDING_X}px`,
};
