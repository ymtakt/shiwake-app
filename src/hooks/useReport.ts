import { addYears, format, subYears } from "date-fns";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";

import { useAuth } from "../atom";
import { app } from "../firebase";
import { createPositiveAndNegativeNumArrayYear } from "../util";


// export const monthTotal = () => {
//   const { plus, minus } = createPositiveAndNegativeNumArray();
// }

export const useReport = () => {
  //年のステート
  const [nowYear, setNowYear] = useState<any>(new Date());
  const year = Number(format(nowYear, 'yyyy'));
  //年別の月間の内容全て
  const [detailsYear, setDetailsYear] = useState<any>([]);

  // Recoilのログイン状態
  const user = useAuth();
  // データベース接続
  const db = getFirestore(app);

  const { incomeNum, spendingNum } = createPositiveAndNegativeNumArrayYear(detailsYear, year);

  const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  // const aaa = incomeNum.filter((n: { month: number; }) => {
  const monthPositive = numArr.map((monthNum) => (
    incomeNum.filter((n: { month: number; }) => {
      return n.month === monthNum;
    })
  ));

  const monthNegative = numArr.map((monthNum) => (
    spendingNum.filter((n: { month: number; }) => {
      return n.month === monthNum;
    })
  ));

  //年月配列
  // const JanuaryPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 1;
  // });
  // const JanuaryMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 1;
  // });

  // const FebruaryPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 2;
  // });
  // const FebruaryMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 2;
  // });

  // const MarchPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 3;
  // });
  // const MarchMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 3;
  // });

  // const AprilPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 4;
  // });
  // const AprilMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 4;
  // });

  // const MayPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 5;
  // });
  // const MayMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 5;
  // });

  // const JunePlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 6;
  // });
  // const JuneMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 6;
  // });

  // const JulyPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 7;
  // });
  // const JulyMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 7;
  // });

  // const AugustPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 8;
  // });
  // const AugustMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 8;
  // });

  // const SeptemberPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 9;
  // });
  // const SeptemberMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 9;
  // });

  // const OctoberPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 10;
  // });
  // const OctoberMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 10;
  // });

  // const NovemberPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 11;
  // });
  // const NovemberMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 11;
  // });

  // const DecemberPlus = incomeNum.filter((n: { month: number; }) => {
  //   return n.month === 12;
  // });
  // const DecemberMinus = spendingNum.filter((n: { month: number; }) => {
  //   return n.month === 12;
  // });


  const monthPositiveTotal = monthPositive.map((monthNum, length) => (
    {
      id: length,
      price: monthNum.reduce((sum: any, X: { price: any; }) => {
        const plus = sum + X.price;
        return Number(plus);
      }, 0)
    }
  ));

  const monthNegativeTotal = monthNegative.map((monthNum, length) => (
    {
      id: length,
      price: monthNum.reduce((sum: any, X: { price: any; }) => {
        const minus = sum + X.price;
        return Number(minus);
      }, 0),
    }
  ));

  const calc = num.map((num) => (
    {
      id: num,
      price: monthPositiveTotal[num].price - monthNegativeTotal[num].price,
    }
  ));

  // const plusJan = JanuaryPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusJan = JanuaryMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusFeb = FebruaryPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusFeb = FebruaryMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusMar = MarchPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusMar = MarchMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusApr = AprilPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusApr = AprilMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusMay = MayPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusMay = MayMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusJun = JunePlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusJun = JuneMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusJul = JulyPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusJul = JulyMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusAug = AugustPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusAug = AugustMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusSep = SeptemberPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusSep = SeptemberMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusOct = OctoberPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusOct = OctoberMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusNov = NovemberPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusNov = NovemberMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  // const plusDec = DecemberPlus.reduce((sum: any, X: { price: any; }) => {
  //   const plus = sum + X.price;
  //   return Number(plus);
  // }, 0)

  // const minusDec = DecemberMinus.reduce((sum: any, X: { price: any; }) => {
  //   const minus = sum + X.price;
  //   return Number(minus);
  // }, 0)

  //年変更クリックイベント
  const onclickLastYear = () => {
    const lastYear = subYears(nowYear, 1);
    setNowYear(lastYear)
  }
  const onclickNextYear = () => {
    const nextYear = addYears(nowYear, 1);
    setNowYear(nextYear)
  }

  useEffect(() => {
    (async () => {
      if (user) {

        //今月の内容全て読み込み
        //getDocs
        const ref = query(collection(db, 'users', user.uid, 'details'), where('year', '==', year), orderBy('date', 'desc'));
        const docSnapw = await getDocs(ref);
        setDetailsYear(docSnapw.docs.map((doc) => (
          { ...doc.data(), id: doc.id }
        )));

      }
    })()
  }, [user, nowYear]);

  return {
    monthPositiveTotal, monthNegativeTotal, calc,
    // plusJan, plusFeb, plusMar, plusApr, plusMay, plusJun, plusJul, plusAug, plusSep, plusOct, plusNov, plusDec,
    // minusJan, minusFeb, minusMar, minusApr, minusMay, minusJun, minusJul, minusAug, minusSep, minusOct, minusNov, minusDec,
    onclickLastYear, onclickNextYear, year
  }

}