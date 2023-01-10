export const createPositiveAndNegativeNumArray = (month) => {
  //収入配列
  const positiveNum = month.filter((n: { type: string; pl: string; }) => {
    const positiveNumber = n.type === '収入' && n.pl === 'true';
    return positiveNumber;
  });
  //支出配列
  const negativeNum = month.filter((n: { type: string; pl: string; }) => {
    const negativeNumber = n.type === '支出' && n.pl === 'true';
    return negativeNumber;
  });

  const plus = positiveNum.reduce((sum: any, detailMonth: { price: any; }) => {
    const plus = sum + detailMonth.price;
    return plus;
  }, 0)
  const minus = negativeNum.reduce((sum: any, detailMonth: { price: any; }) => {
    const minus = sum + detailMonth.price;
    return minus;
  }, 0)

  return { plus, minus }
}

