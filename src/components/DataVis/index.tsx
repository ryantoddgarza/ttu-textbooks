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
  const unableToPay = data.map(({ unableToPay }) => unableToPay);
  const hasDropped = data.map(({ hasDropped }) => hasDropped);
  const hasWithdrawn = data.map(({ hasWithdrawn }) => hasWithdrawn);
  const cost = data.map(({ cost }) => cost);
  const paymentMethod = data
    .map(({ paymentMethod }) => paymentMethod)
    .filter((ans) => ans != 'GI Bill Benefits');
  const causedTo = data.map(({ causedTo }) => causedTo);

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

  // Reduce cost categories
  const costCategories = instancesIn(cost);

  // Get cost category with the most responses
  const mostCostCategory = getHiValueKey(costCategories);

  // Format cost data for react-vis
  const costData = Object.entries(costCategories).map(([key, value]) => {
    return { x: key, y: value };
  });

  // Sort cost data
  costData.unshift(costData.splice(costData.length - 1, 1)[0]);

  // Reduce payment method categories
  const paymentAnswers = [
    'I use money from family.',
    'I use my own money earned from campus or outside job.',
    'I use money from student loans.',
    'I use non-loan awarded money (i.e. pell grant, scholarships, financial aid, GI bill).',
  ];
  const paymentMethodCategories = instancesIn(paymentMethod, paymentAnswers);
  renameKey(paymentMethodCategories, paymentAnswers[0], 'Family');
  renameKey(paymentMethodCategories, paymentAnswers[1], 'Job');
  renameKey(paymentMethodCategories, paymentAnswers[2], 'Loans');
  renameKey(paymentMethodCategories, paymentAnswers[3], 'Awards');

  // Get payment method category with the most responses
  const mostPaymentMethodCategory = getHiValueKey(paymentMethodCategories);

  // Format payment method data for react-vis
  const paymentMethodData = Object.entries(paymentMethodCategories).map(
    ([key, value]) => {
      return { y: key, x: value };
    }
  );

  // Reduce cause categories
  const causedToAnswers = [
    'Not purchase the required materials',
    'Take fewer courses',
    'Earn a lower grade than expected',
  ];
  const causedToCategories = instancesIn(causedTo, causedToAnswers);

  // Calculate cause percentages
  const causedNoPurchasePct = Math.round(
    (causedToCategories[causedToAnswers[0]] / causedTo.length) * 100
  );

  const causedFewerCoursesPct = Math.round(
    (causedToCategories[causedToAnswers[1]] / causedTo.length) * 100
  );

  const causedLowerGradePct = Math.round(
    (causedToCategories[causedToAnswers[2]] / causedTo.length) * 100
  );

  // For conditional rendering of layout elements
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
              Most students spend {mostCostCategory} per semester on required
              course materials.
            </p>
            <XYPlot
              width={300}
              height={300}
              margin={{ bottom: 72 }}
              xType="ordinal"
            >
              <HorizontalGridLines />
              <VerticalBarSeries data={costData} />
              <XAxis tickLabelAngle={-45} />
              <YAxis />
            </XYPlot>
          </section>
          <section>
            <h4>Payment Method</h4>
            <p>
              When asked how they pay for course materials, most students
              responded, &quot;{mostPaymentMethodCategory.toLowerCase()}.&quot;
            </p>
            <XYPlot
              width={300}
              height={300}
              margin={{ left: 80 }}
              yType="ordinal"
            >
              <VerticalGridLines />
              <HorizontalBarSeries data={paymentMethodData} />
              <XAxis />
              <YAxis />
            </XYPlot>
          </section>
        </div>
        <h3>Material Cost Effects</h3>
        <p>
          <b>{causedNoPurchasePct}%</b> of students said that the cost of
          materials has caused them to{' '}
          <b>not purchase the required materials</b> at some point in their
          enrollment at Texas Tech University.
        </p>
        <p>
          <b>{causedFewerCoursesPct}%</b> of students said that the cost of
          materials has caused them to <b>take fewer courses</b>.
        </p>
        <p>
          <b>{causedLowerGradePct}%</b> of students believe that the cost of
          materials has caused them to <b>earn a lower grade than expected</b>.
        </p>
      </div>
    </>
  );
};

export default DataVis;
