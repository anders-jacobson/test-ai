import React from 'react';
import Navbar from '../../components/Navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="max-w-[1140px] mx-auto">{children}</div>
    </>
  );
}

export default Layout;
