export const getRewardsPoints = (transactions) => {
  console.log(transactions);
  let rewardsPoints = 0;
  transactions.forEach((transaction) => {
    if (
      new Date(transaction.date) >
      new Date().setMonth(new Date().getMonth() - 3)
    ) {
      if (transaction.amount > 50 && transaction.amount < 100) {
        rewardsPoints += Math.floor(transaction.amount) - 50;
      } else if (transaction.amount > 100) {
        rewardsPoints += 2 * (Math.floor(transaction.amount) - 100) + 50;
      }
    }
  });
  return rewardsPoints;
};
