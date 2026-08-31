import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

/**
 * PageTransition
 * Wraps <Outlet /> and uses location.pathname as the React key.
 * Re-mounting the div on each route change triggers the CSS
 * .page-enter animation defined in index.css.
 */
export function PageTransition() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter">
      <Outlet />
    </div>
  );
}
