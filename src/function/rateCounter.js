const rateTooltips = (orders) =>
  orders
    ?.reduce(
      (ratesCounter, { rate }) => {
        if (!rate) return ratesCounter;
        ratesCounter[rate]++;
        return ratesCounter;
      },
      [0, 0, 0, 0, 0, 0]
    )
    .slice(1)
    .map(
      (rateCount, i) => `${rateCount} Customer Rate ${i + 1} stars`
    );

export { rateTooltips };
