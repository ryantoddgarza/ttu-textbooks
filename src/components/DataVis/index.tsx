import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import correlationCoefficient from '../../utils/correlationCoefficient';

const DataVis = () => {
  const {
    allGoogleFormResponses1Sheet: { nodes },
  } = useStaticQuery(graphql`
    query DataVisQuery {
      allGoogleFormResponses1Sheet {
        nodes {
          unableToPay: haveYouEverBeenUnableToPayForRequiredCourseMaterial_s__
          hasDropped: haveYouEverDropped__doesNotAppearOnTranscript_ACourseAtTexasTechUniversity_
          hasWithdrawn: haveYouEverWithdrawn__appearsOnTranscriptAsA__W__FromACourseAtTexasTechUniversity_
        }
      }
    }
  `);

  // Remove `null` values
  const data = nodes.filter((node) => {
    let containsNull = false;

    for (const [key, value] of Object.entries(node)) {
      if (value === null) {
        containsNull = true;
      }
    }

    return !containsNull;
  });

  // Transform string data to numerical data
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i].unableToPay === 'string') {
      data[i].unableToPay = data[i].unableToPay === 'Yes' ? 1 : 0;
    }

    if (typeof data[i].hasDropped === 'string') {
      data[i].hasDropped = data[i].hasDropped === 'Yes' ? 1 : 0;
    }

    if (typeof data[i].hasWithdrawn === 'string') {
      data[i].hasWithdrawn = data[i].hasWithdrawn === 'Yes' ? 1 : 0;
    }
  }

  const unableToPay = data.map(({ unableToPay }) => unableToPay);
  const hasDropped = data.map(({ hasDropped }) => hasDropped);
  const hasWithdrawn = data.map(({ hasWithdrawn }) => hasWithdrawn);

  const corrPayDrop = correlationCoefficient(
    unableToPay,
    hasDropped,
    data.length
  );

  const corrPayWithdraw = correlationCoefficient(
    unableToPay,
    hasWithdrawn,
    data.length
  );

  const layout = {
    hasDropData: corrPayDrop > 0,
    hasWitdrawalData: corrPayWithdraw > 0,
  };

  return (
    <>
      <div>
        {(layout.hasDropData || layout.hasWitdrawalData) && (
          <>
            <h3>Drops and Withdrawals</h3>
            {layout.hasDropData && (
              <p>
                Students unable to pay for course materials are{' '}
                <b>{Math.round(corrPayDrop * 100)}% more likely to drop</b>{' '}
                (does not appear on transcript) a course at Texas Tech
                University.
              </p>
            )}
            {layout.hasWitdrawalData && (
              <p>
                Students unable to pay for course materials are{' '}
                <b>
                  {Math.round(corrPayWithdraw * 100)}% more likely to withdraw
                </b>{' '}
                (appears on transcript) a course at Texas Tech University.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DataVis;
