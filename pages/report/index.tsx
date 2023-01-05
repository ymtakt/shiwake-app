import { useEffect, useState } from "react";
import { NextPage } from "next/types";
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
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

import { useAuth } from "../../src/atom";
import { app } from "../../src/firebase";

import { Layout } from '../../src/components/Layout'
import { HeadSecond } from "../../src/Parts/HeadSecond";

import report from '../../styles/Report.module.scss';
import { useReport } from "../../src/useReport";

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
  // データベース接続
  const db = getFirestore(app);

  const {
    plusJan, plusFeb, plusMar, plusApr, plusMay, plusJun, plusJul, plusAug, plusSep, plusOct, plusNov, plusDec,
    minusJan, minusFeb, minusMar, minusApr, minusMay, minusJun, minusJul, minusAug, minusSep, minusOct, minusNov, minusDec,
    onclickLastYear, onclickNextYear, year } = useReport();

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
        data: [plusJan, plusFeb, plusMar, plusApr, plusMay, plusJun, plusJul, plusAug, plusSep, plusOct, plusNov, plusDec],
        backgroundColor: '#59A0E6',
      },
      {
        label: '支出',
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
      }
    })()
    // }, [user, nowYear]);
  }, []);

  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>年間収支レポート</HeadSecond>
          {/* <Box marginBottom='35px'>
            <Link href={'/report'}>
              <Buttonsecondary>月次収支レポート</Buttonsecondary>
            </Link>
            <ButtonPrimary>年間収支レポート</ButtonPrimary>
          </Box> */}
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
                    <Td>+{Number(plusJan).toLocaleString()}円</Td>
                    <Td>+{Number(plusFeb).toLocaleString()}円</Td>
                    <Td>+{Number(plusMar).toLocaleString()}円</Td>
                    <Td>+{Number(plusApr).toLocaleString()}円</Td>
                    <Td>+{Number(plusMay).toLocaleString()}円</Td>
                    <Td>+{Number(plusJun).toLocaleString()}円</Td>
                    <Td>+{Number(plusJul).toLocaleString()}円</Td>
                    <Td>+{Number(plusAug).toLocaleString()}円</Td>
                    <Td>+{Number(plusSep).toLocaleString()}円</Td>
                    <Td>+{Number(plusOct).toLocaleString()}円</Td>
                    <Td>+{Number(plusNov).toLocaleString()}円</Td>
                    <Td>+{Number(plusDec).toLocaleString()}円</Td>
                  </Tr>
                  <Tr>
                    <Td>支出</Td>
                    <Td>-{Number(minusJan).toLocaleString()}円</Td>
                    <Td>-{Number(minusFeb).toLocaleString()}円</Td>
                    <Td>-{Number(minusMar).toLocaleString()}円</Td>
                    <Td>-{Number(minusApr).toLocaleString()}円</Td>
                    <Td>-{Number(minusMay).toLocaleString()}円</Td>
                    <Td>-{Number(minusJun).toLocaleString()}円</Td>
                    <Td>-{Number(minusJul).toLocaleString()}円</Td>
                    <Td>-{Number(minusAug).toLocaleString()}円</Td>
                    <Td>-{Number(minusSep).toLocaleString()}円</Td>
                    <Td>-{Number(minusOct).toLocaleString()}円</Td>
                    <Td>-{Number(minusNov).toLocaleString()}円</Td>
                    <Td>-{Number(minusDec).toLocaleString()}円</Td>
                  </Tr>
                  <Tr>
                    <Td>合計</Td>
                    <Td>{Number(plusJan - minusJan).toLocaleString()}円</Td>
                    <Td>{Number(plusFeb - minusFeb).toLocaleString()}円</Td>
                    <Td>{Number(plusMar - minusMar).toLocaleString()}円</Td>
                    <Td>{Number(plusApr - minusApr).toLocaleString()}円</Td>
                    <Td>{Number(plusMay - minusMay).toLocaleString()}円</Td>
                    <Td>{Number(plusJun - minusJun).toLocaleString()}円</Td>
                    <Td>{Number(plusJul - minusJul).toLocaleString()}円</Td>
                    <Td>{Number(plusAug - minusAug).toLocaleString()}円</Td>
                    <Td>{Number(plusSep - minusSep).toLocaleString()}円</Td>
                    <Td>{Number(plusOct - minusOct).toLocaleString()}円</Td>
                    <Td>{Number(plusNov - minusNov).toLocaleString()}円</Td>
                    <Td>{Number(plusDec - minusDec).toLocaleString()}円</Td>
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