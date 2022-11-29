// Returns correlation coefficient given 2 number arrays and 1 size parameter.

const correlationCoefficient = (
  X: number[],
  Y: number[],
  n: number
): number => {
  let sum_X = 0;
  let sum_Y = 0;
  let sum_XY = 0;
  let squareSum_X = 0;
  let squareSum_Y = 0;

  for (let i = 0; i < n; i++) {
    sum_X = sum_X + X[i];
    sum_Y = sum_Y + Y[i];

    // Sum of X[i] * Y[i]
    sum_XY = sum_XY + X[i] * Y[i];

    // Sum of square of array elements
    squareSum_X = squareSum_X + X[i] * X[i];
    squareSum_Y = squareSum_Y + Y[i] * Y[i];
  }

  // Calculate correlation coefficient
  const corr =
    (n * sum_XY - sum_X * sum_Y) /
    Math.sqrt(
      (n * squareSum_X - sum_X * sum_X) * (n * squareSum_Y - sum_Y * sum_Y)
    );

  return corr;
};

export default correlationCoefficient;
