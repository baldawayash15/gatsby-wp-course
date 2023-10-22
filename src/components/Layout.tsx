import React from 'react';

import Menu from './Menu';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};
