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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
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

export const data = {
  labels,
  datasets: [
    {
      label: '収入',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: '#E67A59',
    },
    {
      label: '支出',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: '#59A0E6',
    },
  ],
};


const Year: NextPage = () => {


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
            <Box className={report.prev}>前の年</Box>
            <Box className={report.list}>2022年</Box>
            <Box className={report.next}>次の年</Box>
          </Flex>
          <Box marginBottom='90px'>
            <Bar options={options} data={data} />
          </Box>
          <Box className={report.table_year}>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>登録内容</Th>
                    <Th>2022年1月</Th>
                    <Th>2022年2月</Th>
                    <Th>2022年3月</Th>
                    <Th>2022年4月</Th>
                    <Th>2022年5月</Th>
                    <Th>2022年6月</Th>
                    <Th>2022年7月</Th>
                    <Th>2022年8月</Th>
                    <Th>2022年9月</Th>
                    <Th>2022年10月</Th>
                    <Th>2022年11月</Th>
                    <Th>2022年12月</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>収入</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                  </Tr>
                  <Tr>
                    <Td>支出</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                  </Tr>
                  <Tr>
                    <Td>合計</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
                    <Td>+100,000</Td>
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