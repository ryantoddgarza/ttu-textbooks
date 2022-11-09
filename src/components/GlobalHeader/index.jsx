import React from 'react';
import { Link } from 'gatsby';
import { HOME_PATH } from '../../constants';
import globalNav from '../../data/globalNav';

const GlobalHeader = () => (
  <header className="global-header section light">
    <div className="item logo-container">
      <div className="logo">
        <Link to={HOME_PATH}></Link>
      </div>
      <div>
        <Link to={HOME_PATH}>Textbooks</Link>
      </div>
    </div>
    <nav className="item nav">
      <ul className="list">
        {globalNav.map(({ id, name, path }) => (
          <li className="list-item" key={id}>
            <Link className="link" to={path}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default GlobalHeader;
