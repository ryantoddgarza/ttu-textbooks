import React from 'react';
import GlobalHeader from '../GlobalHeader';
import GlobalMain from '../GlobalMain';
import GlobalFooter from '../GlobalFooter';

const Layout = ({ children }) => (
  <>
    <GlobalHeader />
    <GlobalMain>{children}</GlobalMain>
    <GlobalFooter />
  </>
);

export default Layout;
