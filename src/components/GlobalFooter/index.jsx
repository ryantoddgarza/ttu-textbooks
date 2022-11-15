import React from 'react';
import { Link } from 'gatsby';
import { FaGithub } from 'react-icons/fa';
import { TEAM_PATH, GITHUB_URL } from '../../constants';

const GlobalFooter = () => (
  <footer className="global-footer section dark">
    <div className="item social">
      <h2 className="heading">Follow the Project</h2>
      <ul className="list">
        <li>
          <div className="icon">
            <a
              className="link light"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div className="item copyright">
      <Link to={TEAM_PATH}>{`© ${new Date().getFullYear()} Project Team`}</Link>
    </div>
  </footer>
);

export default GlobalFooter;
