import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Educators = () => {
  const {
    markdownRemark: { html },
  } = useStaticQuery(graphql`
    query EducatorQuery {
      markdownRemark(frontmatter: { title: { eq: "Educator Resources" } }) {
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

export default Educators;
