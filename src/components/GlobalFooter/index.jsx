import React from 'react';
import { Link } from 'gatsby';
import { TEAM_PATH } from '../../constants';

const GlobalFooter = () => (
  <footer className="global-footer section dark">
    <div className="copyright">
      <Link to={TEAM_PATH}>{`© ${new Date().getFullYear()} Project Team`}</Link>
    </div>
  </footer>
);

export default GlobalFooter;
