import React from 'react';
import team from '../../data/team';

const Team = () => (
  <div className="main-content">
    <section className="page-content">
      <h1>Project Team</h1>
      {team.map(({ id, name, role, major, email }) => (
        <div key={id}>
          <p>
            <div>
              <b>
                <a href={`mailto:${email}`}>{name}</a>
              </b>
            </div>
            <div>{role}</div>
            <div>{major}</div>
          </p>
        </div>
      ))}
    </section>
  </div>
);

export default Team;
