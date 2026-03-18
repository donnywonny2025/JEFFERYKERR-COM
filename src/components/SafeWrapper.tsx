'use client';

import React, { ReactNode } from 'react';

interface SafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SafeWrapper({ children, fallback }: SafeWrapperProps) {
  // Basic safe wrapper that renders children without additional logic
  // Can be extended later with error boundaries if needed
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('SafeWrapper error:', error);
    return <>{fallback || <div>Error rendering component</div>}</>;
  }
}