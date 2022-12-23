import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import Link from "next/link";
import { Box, Flex, TableContainer, Table, Thead, Tbody, Th, Td, Tr } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { collection, doc, getFirestore, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { format, addYears, subYears } from 'date-fns'

import { Layout } from '../../src/components/Layout'
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";
import { Buttonsecondary } from "../../src/Parts/Buttonsecondary";
import { useAuth } from "../../src/atom";
import { app } from "../../src/firebase";

import report from '../../styles/Report.module.scss';


ChartJS.register(ArcElement, Tooltip, Legend);

const Report: NextPage = () => {


  //今月の内容全て
  const [details, setDetails] = useState<any>([]);
  //データのステート
  const [userData, setUserData] = useState<any>();
  //今月の内容全て
  const [detailsMonth, setDetailsMonth] = useState<any>([]);
  //年のステート
  const [nowYear, setNowYear] = useState<any>(new Date());
  const year = Number(format(nowYear, 'yyyy'));
  //月のステート
  const [nowMonth, setNowMonth] = useState<any>(new Date().getMonth() + 1);

  //Recoilのログイン状態
  const user = useAuth();

  //データベース接続
  const db = getFirestore(app);


  //クリックイベント
  const onclickLastYear = () => {
    const lastYear = subYears(nowYear, 1);
    setNowYear(lastYear)
  }
  const onclickNextYear = () => {
    const nextYear = addYears(nowYear, 1);
    setNowYear(nextYear)
  }
  const onClickMonth = (e: number) => {
    setNowMonth(e)
  }


  //収入配列
  const positiveNum = detailsMonth.filter((n: { type: string; }) => {
    const positiveNumber = n.type === '収入';
    return positiveNumber;
  });
  //支出配列
  const negativeNum = detailsMonth.filter((n: { type: string; }) => {
    const negativeNumber = n.type === '支出';
    return negativeNumber;
  });

  const plus = positiveNum.reduce((sum: any, X: { price: any; }) => {
    const plus = sum + X.price;
    return Number(plus);
  }, 0)

  const minus = negativeNum.reduce((sum: any, X: { price: any; }) => {
    const minus = sum + X.price;
    return Number(minus);
  }, 0)


  const data = {
    labels: ['収入', '支出'],
    datasets: [
      {
        // label: '# of Votes',
        data: [plus, minus],
        backgroundColor: [
          '#4D88B5',
          '#397561',
          '#000',
        ],
        borderWidth: 1,
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
          where('month', '==', nowMonth),
          orderBy('date', 'desc'));
        await onSnapshot(
          qSum, (snapshot) => setDetailsMonth(snapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
          )))
          , //取得時にidをdoc.idにする
          (error) => {
            console.log(error.message);
          },
        );

      }
    })()
  }, [user, nowMonth, nowYear]);



  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>月次収支レポート</HeadSecond>
          <Box marginBottom='35px'>
            <ButtonPrimary marginRight="12px">月次収支レポート</ButtonPrimary>
            <Link href={'/report/year'}>
              <Buttonsecondary>年間収支レポート</Buttonsecondary>
            </Link>
          </Box>
          <Flex className={report.mav_flex}>
            <Box className={report.prev} onClick={onclickLastYear}>前の年</Box>
            <ul className={report.list} >
              <li onClick={() => onClickMonth(1)}>1月</li>
              <li onClick={() => onClickMonth(2)}>2月</li>
              <li onClick={() => onClickMonth(3)}>3月</li>
              <li onClick={() => onClickMonth(4)}>4月</li>
              <li onClick={() => onClickMonth(5)}>5月</li>
              <li onClick={() => onClickMonth(6)}>6月</li>
              <li onClick={() => onClickMonth(7)}>7月</li>
              <li onClick={() => onClickMonth(8)}>8月</li>
              <li onClick={() => onClickMonth(9)}>9月</li>
              <li onClick={() => onClickMonth(10)}>10月</li>
              <li onClick={() => onClickMonth(11)}>11月</li>
              <li onClick={() => onClickMonth(12)}>12月</li>
            </ul>
            <Box className={report.next} onClick={onclickNextYear}>次の年</Box>
          </Flex>
          <Flex justifyContent='space-between'>
            <Box w='40%'>
              <Box>
                {year}年
                {nowMonth}月
              </Box>
              <Pie data={data} />
            </Box>
            <Box w='50%' className={report.table_month}>
              <Box>
                収入
              </Box>
              <TableContainer className={report.box}>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>会社名</Th>
                      <Th>金額</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* {details ? */}
                    {
                      detailsMonth.map((detail: any) => {
                        return (
                          user !== null && (
                            detail.type === '収入' && (
                              <Tr className={report.tr_color} key={detail.id}>
                                <Td >{detail.client}</Td>
                                <Td>+{detail.price}円</Td>
                              </Tr>
                            )
                          )
                        )
                      })
                    }
                    {/* :
                      <Text>ありません</Text>
                    } */}
                  </Tbody>

                </Table>
              </TableContainer>

              <Box>
                支出
              </Box>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>科目</Th>
                      <Th>金額</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* {details ? */}
                    {
                      detailsMonth.map((detail: any) => {
                        return (
                          user !== null && (
                            detail.type === '支出' && (
                              <Tr className={report.tr_color} key={detail.id}>
                                <Td >{detail.accountDebit}</Td>
                                <Td>-{detail.price}円</Td>
                              </Tr>
                            )
                          )
                        )
                      })
                    }
                    {/* :
                      <Text>ありません</Text>
                    } */}
                  </Tbody>

                </Table>
              </TableContainer>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </>
  )
}
export default Report;