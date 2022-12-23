import { addYears, format, subYears } from "date-fns";
import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import Link from "next/link";
import { Box, Flex, TableContainer, Table, Thead, Tbody, Th, Td, Tr } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import { Layout } from '../../src/components/Layout'
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { Buttonsecondary } from "../../src/Parts/Buttonsecondary";
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";

import report from '../../styles/Report.module.scss';
import { useAuth } from "../../src/atom";
import { collection, doc, getFirestore, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { app } from "../../src/firebase";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Year: NextPage = () => {

  //年のステート
  const [nowYear, setNowYear] = useState<any>(new Date());
  const year = Number(format(nowYear, 'yyyy'));

  //データのステート
  const [userData, setUserData] = useState<any>();
  //今月の内容全て
  const [detailsYear, setDetailsYear] = useState<any>([]);

  //Recoilのログイン状態
  const user = useAuth();
  // console.log(user)

  //データベース接続
  const db = getFirestore(app);


  //収入配列
  const incomeNum = detailsYear.filter((n: { type: string; year: number; pl: string; }) => {
    return n.type === '収入' && n.year === year && n.pl === 'true';
  });
  //支出配列
  const spendingNum = detailsYear.filter((n: { type: string; year: number; pl: string; }) => {
    return n.type === '支出' && n.year === year && n.pl === 'true';
  });

  //年月配列
  const JanuaryPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 1;
  });
  const JanuaryMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 1;
  });

  const FebruaryPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 2;
  });
  const FebruaryMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 2;
  });

  const MarchPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 3;
  });
  const MarchMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 3;
  });

  const AprilPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 4;
  });
  const AprilMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 4;
  });

  const MayPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 5;
  });
  const MayMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 5;
  });

  const JunePlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 6;
  });
  const JuneMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 6;
  });

  const JulyPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 7;
  });
  const JulyMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 7;
  });

  const AugustPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 8;
  });
  const AugustMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 8;
  });

  const SeptemberPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 9;
  });
  const SeptemberMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 9;
  });

  const OctoberPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 10;
  });
  const OctoberMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 10;
  });

  const NovemberPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 11;
  });
  const NovemberMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 11;
  });

  const DecemberPlus = incomeNum.filter((n: { month: number; }) => {
    return n.month === 12;
  });
  const DecemberMinus = spendingNum.filter((n: { month: number; }) => {
    return n.month === 12;
  });



  const plusJan = JanuaryPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusJan = JanuaryMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusFeb = FebruaryPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusFeb = FebruaryMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusMar = MarchPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusMar = MarchMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusApr = AprilPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusApr = AprilMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusMay = MayPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusMay = MayMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusJun = JunePlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusJun = JuneMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusJul = JulyPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusJul = JulyMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusAug = AugustPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusAug = AugustMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusSep = SeptemberPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusSep = SeptemberMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusOct = OctoberPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusOct = OctoberMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusNov = NovemberPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusNov = NovemberMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)

  const plusDec = DecemberPlus.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minusDec = DecemberMinus.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)


  //年変更クリックイベント
  const onclickLastYear = () => {
    const lastYear = subYears(nowYear, 1);
    setNowYear(lastYear)
  }
  const onclickNextYear = () => {
    const nextYear = addYears(nowYear, 1);
    setNowYear(nextYear)
  }

  //グラフ用
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
  };
  const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const data = {
    labels,
    datasets: [
      {
        label: '収入',
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [plusJan, plusFeb, plusMar, plusApr, plusMay, plusJun, plusJul, plusAug, plusSep, plusOct, plusNov, plusDec],
        backgroundColor: '#59A0E6',
      },
      {
        label: '支出',
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [minusJan, minusFeb, minusMar, minusApr, minusMay, minusJun, minusJul, minusAug, minusSep, minusOct, minusNov, minusDec],
        backgroundColor: '#E67A59',
      },
    ],
  };


  useEffect(() => {
    (async () => {
      if (user) {

        //ユーザー読み込み
        await onSnapshot(doc(db, "users", user.uid), (doc) => {
          setUserData(doc.data())
        });

        //ユーザーデータ読み込み
        const usersCollectionRef = await collection(db, 'users', user.uid, 'details');
        //今月の内容全て読み込み
        const qSum = query(usersCollectionRef,
          where('year', '==', year),
          orderBy('date', 'desc'));
        await onSnapshot(
          qSum, (snapshot) => setDetailsYear(snapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
          )))
          , //取得時にidをdoc.idにする
          (error) => {
            console.log(error.message);
          },
        );

      }
    })()
  }, [user, nowYear]);

  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>年間収支レポート</HeadSecond>
          <Box marginBottom='35px'>
            <Link href={'/report'}>
              <Buttonsecondary>月次収支レポート</Buttonsecondary>
            </Link>
            <ButtonPrimary>年間収支レポート</ButtonPrimary>
          </Box>
          <Flex className={report.mav_flex}>
            <Box className={report.prev} onClick={onclickLastYear}>前の年</Box>
            <Box className={report.list}>{year}年</Box>
            <Box className={report.next} onClick={onclickNextYear}>次の年</Box>
          </Flex>
          <Box marginBottom='90px'>
            <Bar options={options} data={data} />
          </Box>
          <Box className={report.table_year}>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>{year}年1月</Th>
                    <Th>{year}年2月</Th>
                    <Th>{year}年3月</Th>
                    <Th>{year}年4月</Th>
                    <Th>{year}年5月</Th>
                    <Th>{year}年6月</Th>
                    <Th>{year}年7月</Th>
                    <Th>{year}年8月</Th>
                    <Th>{year}年9月</Th>
                    <Th>{year}年10月</Th>
                    <Th>{year}年11月</Th>
                    <Th>{year}年12月</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>収入</Td>
                    <Td>+{plusJan}円</Td>
                    <Td>+{plusFeb}円</Td>
                    <Td>+{plusMar}円</Td>
                    <Td>+{plusApr}円</Td>
                    <Td>+{plusMay}円</Td>
                    <Td>+{plusJun}円</Td>
                    <Td>+{plusJul}円</Td>
                    <Td>+{plusAug}円</Td>
                    <Td>+{plusSep}円</Td>
                    <Td>+{plusOct}円</Td>
                    <Td>+{plusNov}円</Td>
                    <Td>+{plusDec}円</Td>

                  </Tr>
                  <Tr>
                    <Td>支出</Td>
                    <Td>-{minusJan}円</Td>
                    <Td>-{minusFeb}円</Td>
                    <Td>-{minusMar}円</Td>
                    <Td>-{minusApr}円</Td>
                    <Td>-{minusMay}円</Td>
                    <Td>-{minusJun}円</Td>
                    <Td>-{minusJul}円</Td>
                    <Td>-{minusAug}円</Td>
                    <Td>-{minusSep}円</Td>
                    <Td>-{minusOct}円</Td>
                    <Td>-{minusNov}円</Td>
                    <Td>-{minusDec}円</Td>
                  </Tr>
                  <Tr>
                    <Td>合計</Td>
                    <Td>{plusJan - minusJan}円</Td>
                    <Td>{plusFeb - minusFeb}円</Td>
                    <Td>{plusMar - minusMar}円</Td>
                    <Td>{plusApr - minusApr}円</Td>
                    <Td>{plusMay - minusMay}円</Td>
                    <Td>{plusJun - minusJun}円</Td>
                    <Td>{plusJul - minusJul}円</Td>
                    <Td>{plusAug - minusAug}円</Td>
                    <Td>{plusSep - minusSep}円</Td>
                    <Td>{plusOct - minusOct}円</Td>
                    <Td>{plusNov - minusNov}円</Td>
                    <Td>{plusDec - minusDec}円</Td>
                  </Tr>
                </Tbody>

              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Layout>
    </>
  )
}
export default Year;