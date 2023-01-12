import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { Box, Flex, TableContainer, Table, Thead, Tbody, Th, Td, Tr } from '@chakra-ui/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { doc, onSnapshot } from "firebase/firestore";

import { useAuth } from "../../src/atom";
import { db } from "../../src/firebase";

import { Layout } from '../../src/components/Layout'
import { HeadSecond } from "../../src/components/HeadSecond";

import report from '../../styles/Report.module.scss';
import { useReport } from "../../src/hooks/useReport";
import { month } from "../../src/util";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Year: NextPage = () => {
  //データのステート
  const [userData, setUserData] = useState<any>();
  // Recoilのログイン状態
  const user = useAuth();

  const {
    monthPositiveTotal, monthNegativeTotal, calc,
    onclickLastYear, onclickNextYear, year } = useReport();

  const numberToLocalString = (price: string | number) => Number(price).toLocaleString()

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
        data: monthPositiveTotal.map((num) => num.price),
        backgroundColor: '#59A0E6',
      },
      {
        label: '支出',
        data: monthNegativeTotal.map((num) => num.price),
        backgroundColor: '#E67A59',
      },
    ],
  };


  useEffect(() => {
    (async () => {
      if (user) {
        //ユーザー読み込み
        const unsubscribe = await onSnapshot(doc(db, "users", user.uid), (doc) => {
          setUserData(doc.data())
        });
        unsubscribe();
      }
    })()
    // }, [user, nowYear]);
  }, []);

  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>年間収支レポート</HeadSecond>
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
                    {month.map((month) => (
                      <Th key={month}>{year}年{month}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>収入</Td>
                    {monthPositiveTotal.map((monthPrice) => (
                      <Td key={monthPrice.id}>+{numberToLocalString(monthPrice.price)}円</Td>
                    ))}
                  </Tr>
                  <Tr>
                    <Td>支出</Td>
                    {monthNegativeTotal.map((monthPrice) => (
                      <Td key={monthPrice.id}>-{numberToLocalString(monthPrice.price)}円</Td>
                    ))}
                  </Tr>
                  <Tr>
                    <Td>合計</Td>
                    {calc.map((price) => (
                      <Td key={price.id}>{numberToLocalString(price.price)}円</Td>
                    ))}
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