import React from 'react';
import NavbarRoot from '../../components/NavbarRoot';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarRoot />
      <div className="max-w-[1140px] mx-auto">{children}</div>
    </>
  );
}

export default Layout;
