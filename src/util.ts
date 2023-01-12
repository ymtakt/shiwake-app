export const accountName = {
  date: '取引日',
  payments: '収支',
  client: '取引先',
  pl: '損益',
  settlement: '決済',
  debit: '借方',
  credit: '貸方',
  image: '書類データ',
  remarks: '備考',
  price: '金額',
}

export const month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

export const sidebars = [
  {
    name: 'ホーム',
    href: '/mypage',
    src: '/icon-home.svg',
  },
  {
    name: '使い方',
    href: '/usage',
    src: '/icon-usage.svg',
  },
  {
    name: '仕訳入力',
    href: '/account/register',
    src: '/icon-register.svg',
  },
  {
    name: '仕訳一覧',
    href: '/account',
    src: '/icon-account.svg',
  },
  {
    name: '損益レポート',
    href: '/report',
    src: '/icon-report.svg',
  },

]

export const createPositiveAndNegativeNumArray = (month?: any) => {
  //月間収入配列
  const positiveNum = month.filter((n: { type: string; pl: string; }) => {
    const positiveNumber = n.type === '収入' && n.pl === 'true';
    return positiveNumber;
  });
  //月間支出配列
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

export const createPositiveAndNegativeNumArrayYear = (detailsYear?: any, year?: any) => {
  //年間収入配列
  const incomeNum = detailsYear.filter((n: { type: string; year: number; pl: string; }) => {
    return n.type === '収入' && n.year === year && n.pl === 'true';
  });
  //年間支出配列
  const spendingNum = detailsYear.filter((n: { type: string; year: number; pl: string; }) => {
    return n.type === '支出' && n.year === year && n.pl === 'true';
  });

  return { incomeNum, spendingNum }
}

export const selectMonth = () => {
  //日付→今月
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const nowtoday = new Date();
  const lastMonth1 = today.setMonth(today.getMonth() - 1);
  const lastMonth2 = today.setMonth(today.getMonth() - 1);
  const lastMonth3 = today.setMonth(today.getMonth() - 1);
  const lastMonth4 = today.setMonth(today.getMonth() - 1);
  const lastMonth5 = today.setMonth(today.getMonth() - 1);
  const lastMonth6 = today.setMonth(today.getMonth() - 1);
  const lastMonth7 = today.setMonth(today.getMonth() - 1);
  const lastMonth8 = today.setMonth(today.getMonth() - 1);
  const lastMonth9 = today.setMonth(today.getMonth() - 1);
  const lastMonth10 = today.setMonth(today.getMonth() - 1);
  const lastMonth11 = today.setMonth(today.getMonth() - 1);

  return { nowtoday, lastMonth1, lastMonth2, lastMonth3, lastMonth4, lastMonth5, lastMonth6, lastMonth7, lastMonth8, lastMonth9, lastMonth10, lastMonth11 }
}
