import React from 'react';
import team from '../../data/team';

const Team = () => (
  <div className="main-content">
    <section className="page-content">
      <h1>Project Team</h1>
      {team.map(({ id, name, role, major, email }) => (
        <div key={id}>
          <p>
            <b>
              <a href={`mailto:${email}`}>{name}</a>
            </b>
            <br />
            {role}
            <br />
            {major}
          </p>
        </div>
      ))}
    </section>
  </div>
);

export default Team;
