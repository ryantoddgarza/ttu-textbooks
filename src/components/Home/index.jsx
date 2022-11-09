import React from 'react';
import { Link } from 'gatsby';
import { EDUCATORS_PATH, STUDENTS_PATH } from '../../constants';

const Home = () => (
  <div className="main-content">
    <section className="page-content">
      <h1>The Textbook Problem</h1>
      <p>
        Elit adipisicing eveniet quae eius at. Expedita optio sint explicabo
        soluta quidem reiciendis. Quia facere sed temporibus sed nobis Officiis
        inventore sit necessitatibus optio repellat? Quia exercitationem animi
        numquam provident <a href="/">Link example</a>.
      </p>
    </section>
    <section className="page-content">
      <h2>Survey Data</h2>
      <p>
        Adipisicing quam error quaerat repellendus laborum Quaerat repellat
        minima placeat accusantium amet corrupti. Consectetur magni quia
        expedita ut quasi. Consequuntur molestiae necessitatibus quaerat quia
        nihil, eveniet. Sequi enim sit non.
      </p>
      <div className="text-align-center">
        <a href="/" className="button large dark">
          Take the Survey
        </a>
      </div>
      <p>
        Sit molestias ipsum consectetur excepturi vitae. Fugit a vero laboriosam
        corrupti possimus. Tempore similique dolor ut maiores incidunt. Atque
        facilis praesentium pariatur delectus aliquam qui nam. Beatae tempora
        adipisci reprehenderit.
      </p>
    </section>
    <section className="page-content">
      <h2>Resources</h2>
      <p>
        Sit ab iste dignissimos asperiores quam asperiores ipsum eos ea?
        Provident ipsam repellat vel adipisci dolor Optio mollitia similique
        debitis dolore esse? Ex officia maiores distinctio odit distinctio
        recusandae libero.
      </p>
      <h3>
        <Link to={STUDENTS_PATH}>Resources for Students</Link>
      </h3>
      <h3>
        <Link to={EDUCATORS_PATH}>Resources for Educators</Link>
      </h3>
    </section>
  </div>
);

export default Home;
