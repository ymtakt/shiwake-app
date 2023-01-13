/* eslint-disable react-hooks/exhaustive-deps */
import { addYears, format, subYears } from "date-fns";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";

import { useAuth } from "../atom";
import { app } from "../firebase";
import { createPositiveAndNegativeNumArrayYear } from "../util";


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

  //年月配列
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


  const monthPositiveTotal = monthPositive.map((monthNum, index) => (
    {
      id: index,
      price: monthNum.reduce((sum: any, X: { price: any; }) => {
        const plus = sum + X.price;
        return Number(plus);
      }, 0)
    }
  ));

  const monthNegativeTotal = monthNegative.map((monthNum, index) => (
    {
      id: index,
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
    // }, [user, nowYear]);
  }, [nowYear]);

  return {
    monthPositiveTotal, monthNegativeTotal, calc,
    onclickLastYear, onclickNextYear, year
  }

}