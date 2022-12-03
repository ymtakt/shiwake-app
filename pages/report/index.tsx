import { NextPage } from "next/types";
import Link from "next/link";
import { Box, Flex, TableContainer, Table, Thead, Tbody, Th, Td, Tr } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Layout } from '../../src/components/Layout'
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";
import { Buttonsecondary } from "../../src/Parts/Buttonsecondary";

import report from '../../styles/Report.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ['交通費', '外注費', '諸費用'],
  datasets: [
    {
      // label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        '#4D88B5',
        '#397561',
        '#EAA82A',
      ],
      borderWidth: 1,
    },
  ],
};


const Report: NextPage = () => {


  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>月次収支レポート</HeadSecond>
          <Box marginBottom='35px'>
            <ButtonPrimary>月次収支レポート</ButtonPrimary>
            <Link href={'/report/year'}>
              <Buttonsecondary>年間収支レポート</Buttonsecondary>
            </Link>
          </Box>
          <Flex className={report.mav_flex}>
            <Box className={report.prev}>前の年</Box>
            <ul className={report.list}>
              <li>1月</li>
              <li>2月</li>
              <li>3月</li>
              <li>4月</li>
              <li>5月</li>
              <li>6月</li>
              <li>7月</li>
              <li>8月</li>
              <li>9月</li>
              <li>10月</li>
              <li>11月</li>
              <li>12月</li>
            </ul>
            <Box className={report.next}>次の年</Box>
          </Flex>
          <Flex justifyContent='space-between'>
            <Box w='40%'>
              <Pie data={data} />
            </Box>
            <Box w='50%' className={report.table_month}>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>登録内容</Th>
                      <Th>金額</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>通信費</Td>
                      <Td>+100,000</Td>
                    </Tr>
                    <Tr>
                      <Td>通信費</Td>
                      <Td>+100,000</Td>
                    </Tr>
                    <Tr>
                      <Td>通信費</Td>
                      <Td>+100,000</Td>
                    </Tr>
                    <Tr>
                      <Td>通信費</Td>
                      <Td>+100,000</Td>
                    </Tr>
                    <Tr>
                      <Td>通信費</Td>
                      <Td>+100,000</Td>
                    </Tr>
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