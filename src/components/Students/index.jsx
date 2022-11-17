import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Students = () => {
  const {
    markdownRemark: { html },
  } = useStaticQuery(graphql`
    query StudentsQuery {
      markdownRemark(frontmatter: { title: { eq: "Student Resources" } }) {
        html
      }
    }
  `);

  return (
    <div className="main-content">
      <section className="page-content">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </div>
  );
};

export default Students;
