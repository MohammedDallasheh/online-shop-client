export const rateTooltips = (orders) => {
  const counters = [0, 0, 0, 0, 0];
  orders?.forEach((order) => {
    if (order.rate) counters[order.rate - 1]++;
  });

  return counters.map(
    (counter, i) => `${counter} Customer Rate ${i + 1} stars`
  );
};
