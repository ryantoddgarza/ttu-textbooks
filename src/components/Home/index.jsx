import React from 'react';
import { Link } from 'gatsby';
import {
  EDUCATORS_PATH,
  STUDENTS_PATH,
  STUDENT_SURVEY_URL,
} from '../../constants';

const Home = () => (
  <div className="main-content">
    <section className="page-content">
      <h1>The Impact of High Textbook Costs on Student Success</h1>
      <p>
        This project addresses the impact of high course material (textbook)
        costs on student academic performance and success at Texas Tech
        University.
      </p>
    </section>
    <section className="page-content">
      <h2>Student Survey</h2>
      <p>
        Data from our{' '}
        <a href={STUDENT_SURVEY_URL} target="_blank" rel="noopener noreferrer">
          student survey
        </a>{' '}
        is being continually compiled and analyzed. Any and all Texas Tech
        students are encouraged to respond to the general demographic,
        financial, and academic questions presented in the survey so that this
        study can monitor the correlations over time.
      </p>
      <div className="text-align-center">
        <a
          className="button large dark"
          href={STUDENT_SURVEY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Take the Survey
        </a>
      </div>
    </section>
    <section className="page-content">
      <h2>Survey Data</h2>
      <p>
        The{' '}
        <a href={STUDENT_SURVEY_URL} target="_blank" rel="noopener noreferrer">
          student survey
        </a>{' '}
        data will be openly available on this site as soon as sufficient data is
        gathered.
      </p>
    </section>
    <section className="page-content">
      <h2>Resources</h2>
      <p>
        Resources for students and faculty are available and focused on ways to
        reduce the potential effects of high course material costs on student
        academic success.
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
