import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {
  HorizontalBarSeries,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import correlationCoefficient from '../../utils/correlationCoefficient';
import instancesIn from '../../utils/instancesIn';
import getHiValueKey from '../../utils/getHiValueKey';
import renameKey from '../../utils/renameKey';

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
          cost: howMuchMoneyDidYouSpendOnRequiredCourseMaterialsThisSemester_
          paymentMethod: howDoYouUsuallyPayForYourCourseMaterials__CheckAllThatApply
          causedTo: duringYourEntireTimeAtTexasTechUniversity_HasTheCostOfMaterialsForACourseCausedYouTo__CheckAllThatApply
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

  // Arrays by question
  const qArr = {
    unableToPay: data.map(({ unableToPay }) => unableToPay),
    hasDropped: data.map(({ hasDropped }) => hasDropped),
    hasWithdrawn: data.map(({ hasWithdrawn }) => hasWithdrawn),
    cost: data.map(({ cost }) => cost),
    paymentMethod: data
      .map(({ paymentMethod }) => paymentMethod)
      .filter((ans) => ans != 'GI Bill Benefits'),
    causedTo: data.map(({ causedTo }) => causedTo),
  };

  // Correlation coefficients
  const corr = {
    payDrop: correlationCoefficient(
      qArr.unableToPay,
      qArr.hasDropped,
      data.length
    ),
    payWithdraw: correlationCoefficient(
      qArr.unableToPay,
      qArr.hasWithdrawn,
      data.length
    ),
  };

  // Cost calculations
  const cost = (() => {
    const categories = instancesIn(qArr.cost);
    const hiCategory = getHiValueKey(categories);
    const reactVis = Object.entries(categories).map(([key, value]) => {
      return { x: key, y: value };
    });

    // Sort react-vis dat
    reactVis.unshift(reactVis.splice(reactVis.length - 1, 1)[0]);

    return {
      category: {
        list: categories,
        hi: hiCategory,
      },
      data: {
        reactVis,
      },
    };
  })();

  // Payment calculations
  const payment = (() => {
    const answers = [
      'I use money from family.',
      'I use my own money earned from campus or outside job.',
      'I use money from student loans.',
      'I use non-loan awarded money (i.e. pell grant, scholarships, financial aid, GI bill).',
    ];
    const categories = instancesIn(qArr.paymentMethod, answers);

    // Rename categories for react-vis
    renameKey(categories, answers[0], 'Family');
    renameKey(categories, answers[1], 'Job');
    renameKey(categories, answers[2], 'Loans');
    renameKey(categories, answers[3], 'Awards');

    const hiCategory = getHiValueKey(categories);
    const reactVis = Object.entries(categories).map(([key, value]) => {
      return { y: key, x: value };
    });

    return {
      category: {
        list: categories,
        hi: hiCategory,
      },
      data: {
        reactVis,
      },
    };
  })();

  // Cause calculations
  const cause = (() => {
    const answers = [
      'Not purchase the required materials',
      'Take fewer courses',
      'Earn a lower grade than expected',
    ];
    const categories = instancesIn(qArr.causedTo, answers);
    const hiCategory = getHiValueKey(categories);
    const questionCalc = {
      noPurchase: {
        pct: Math.round((categories[answers[0]] / qArr.causedTo.length) * 100),
      },
      fewerCourses: {
        pct: Math.round((categories[answers[1]] / qArr.causedTo.length) * 100),
      },
      lowerGrade: {
        pct: Math.round((categories[answers[2]] / qArr.causedTo.length) * 100),
      },
    };

    return {
      category: {
        list: categories,
        hi: hiCategory,
      },
      data: {
        q: questionCalc,
      },
    };
  })();

  // For conditional rendering of layout elements
  const layout = {
    hasDropData: corr.payDrop > 0,
    hasWitdrawalData: corr.payWithdraw > 0,
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
                <b>{Math.round(corr.payDrop * 100)}% more likely to drop</b>{' '}
                (does not appear on transcript) a course at Texas Tech
                University.
              </p>
            )}
            {layout.hasWitdrawalData && (
              <p>
                Students unable to pay for course materials are{' '}
                <b>
                  {Math.round(corr.payWithdraw * 100)}% more likely to withdraw
                </b>{' '}
                (appears on transcript) from a course at Texas Tech University.
              </p>
            )}
          </>
        )}
      </div>
      <div>
        <h3>Financial</h3>
        <div className="visualizations">
          <section>
            <h4>Spending</h4>
            <p>
              Most students spend {cost.category.hi} per semester on required
              course materials.
            </p>
            <XYPlot
              width={300}
              height={300}
              margin={{ bottom: 72 }}
              xType="ordinal"
            >
              <HorizontalGridLines />
              <VerticalBarSeries data={cost.data.reactVis} />
              <XAxis tickLabelAngle={-45} />
              <YAxis />
            </XYPlot>
          </section>
          <section>
            <h4>Payment Method</h4>
            <p>
              When asked how they pay for course materials, most students
              responded, &quot;{payment.category.hi.toLowerCase()}.&quot;
            </p>
            <XYPlot
              width={300}
              height={300}
              margin={{ left: 80 }}
              yType="ordinal"
            >
              <VerticalGridLines />
              <HorizontalBarSeries data={payment.data.reactVis} />
              <XAxis />
              <YAxis />
            </XYPlot>
          </section>
        </div>
        <h3>Material Cost Effects</h3>
        <p>
          <b>{cause.data.q.noPurchase.pct}%</b> of students stated that the cost
          of materials has caused them to{' '}
          <b>not purchase the required materials</b> at some point in their
          enrollment at Texas Tech University.
        </p>
        <p>
          <b>{cause.data.q.fewerCourses.pct}%</b> of students stated that the
          cost of materials has caused them to <b>take fewer courses</b>.
        </p>
        <p>
          <b>{cause.data.q.lowerGrade.pct}%</b> of students believe that the
          cost of materials has caused them to{' '}
          <b>earn a lower grade than expected</b>.
        </p>
      </div>
    </>
  );
};

export default DataVis;
