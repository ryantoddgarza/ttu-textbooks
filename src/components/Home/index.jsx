import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DataVis from '../DataVis';
import { STUDENT_SURVEY_URL } from '../../constants';

const Home = () => {
  const { projectMarkdown, surveyMarkdown, dataMarkdown, resourcesMarkdown } =
    useStaticQuery(graphql`
      query HomeQuery {
        projectMarkdown: markdownRemark(
          frontmatter: { title: { eq: "Project" } }
        ) {
          html
        }
        surveyMarkdown: markdownRemark(
          frontmatter: { title: { eq: "Student Survey" } }
        ) {
          html
        }
        dataMarkdown: markdownRemark(
          frontmatter: { title: { eq: "Survey Data" } }
        ) {
          html
        }
        resourcesMarkdown: markdownRemark(
          frontmatter: { title: { eq: "Resources" } }
        ) {
          html
        }
      }
    `);

  return (
    <div className="main-content">
      <section className="page-content">
        <div dangerouslySetInnerHTML={{ __html: projectMarkdown.html }} />
      </section>
      <section className="page-content">
        <div dangerouslySetInnerHTML={{ __html: surveyMarkdown.html }} />
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
        <div dangerouslySetInnerHTML={{ __html: dataMarkdown.html }} />
        <DataVis />
      </section>
      <section className="page-content">
        <div dangerouslySetInnerHTML={{ __html: resourcesMarkdown.html }} />
      </section>
    </div>
  );
};

export default Home;
