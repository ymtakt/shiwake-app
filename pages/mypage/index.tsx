import { NextPage } from "next/types";
import Link from "next/link";
import { Flex, Box, Image, Text, TableContainer, Table, Thead, Tbody, Th, Td, Tr } from '@chakra-ui/react'

import { Layout } from '../../src/components/Layout'
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { SubText } from "../../src/Parts/SubText";
import { useAuth } from "../../src/atom";

import styles from '../../styles/Table.module.scss';


const Mypage: NextPage = () => {

  const user = useAuth();
  console.log(user)

  return (
    <>
      <Layout>
        <Flex justify='space-between'>
          <Box w='47%'>
            <HeadSecond>今月の仕訳</HeadSecond>
            <ContainerBox>
              <Box marginBottom='40px' borderBottom='1px solid #D9E0E8' >
                <SubText marginBottom='10px'>
                  収支合計
                </SubText>
                <Text textAlign='right' fontSize='30px' color='#162533'>
                  100,000
                  <Box as='span' display='inline-block' fontSize='16px' marginLeft='7px'>円</Box>
                </Text>
              </Box>
              <Box marginBottom='40px'>
                <TableContainer className={styles.table}>
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th className={styles.table_first}>登録内容</Th>
                        <Th>金額</Th>
                        <Th className={styles.table_last}>取引日</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td className={styles.table_first}>通信費</Td>
                        <Td>+100,000</Td>
                        <Td isNumeric className={styles.table_last}>2022/11/24</Td>
                      </Tr>
                      <Tr>
                        <Td className={styles.table_first}>通信費</Td>
                        <Td>+100,000</Td>
                        <Td isNumeric className={styles.table_last}>2022/11/24</Td>
                      </Tr>
                      <Tr>
                        <Td className={styles.table_first}>通信費</Td>
                        <Td>+100,000</Td>
                        <Td isNumeric className={styles.table_last}>2022/11/24</Td>
                      </Tr>
                      <Tr>
                        <Td className={styles.table_first}>通信費</Td>
                        <Td>+100,000</Td>
                        <Td isNumeric className={styles.table_last}>2022/11/24</Td>
                      </Tr>
                      <Tr>
                        <Td className={styles.table_first}>通信費</Td>
                        <Td>+100,000</Td>
                        <Td isNumeric className={styles.table_last}>2022/11/24</Td>
                      </Tr>
                    </Tbody>

                  </Table>
                </TableContainer>
              </Box>
              <Box textAlign='right'>
                <Link href={'/account/register'}>
                  <ButtonPrimary>仕訳を登録する</ButtonPrimary>
                </Link>
              </Box>
            </ContainerBox>
          </Box>
          <Box w='47%'>
            <Box marginBottom='45px'>
              <HeadSecond>アカウント情報</HeadSecond>
              <ContainerBox>
                <Flex align='flex-start' justify='space-between' marginBottom='45px'>
                  {/* {user !== null ? <Image src="/profire-default.svg" alt="" w='85px' h='auto' /> : 'no image'} */}
                  {user !== null ?
                    user.photoURL !== null ?
                      <Image src={user.photoURL as string} alt="" w='85px' h='auto' />
                      :
                      <Image src="/profire-default.svg" alt="" w='85px' h='auto' />
                    : 'no image'}

                  {/* <Image src="/profire-default.svg" alt="" w='85px' h='auto' /> */}
                  <Box w='255px'>
                    <Box marginBottom='25px'>
                      <SubText marginBottom='10px'>
                        アカウント名
                      </SubText>
                      <Text fontSize='15px' paddingLeft='5px' borderBottom='1px solid #D9E0E8'>
                        {user !== null ? user.displayName as string : 'no name'}
                      </Text>
                    </Box>
                    <Box>
                      <SubText marginBottom='10px'>
                        メールアドレス
                      </SubText>
                      <Text fontSize='15px' paddingLeft='5px' borderBottom='1px solid #D9E0E8'>
                        {user !== null ? user.email : 'no email'}
                      </Text>
                    </Box>
                  </Box>
                </Flex>
                <Box textAlign='right'>
                  <Link href={'/mypage/edit'}>
                    <ButtonPrimary>プロフィールを編集する</ButtonPrimary>
                  </Link>
                </Box>
              </ContainerBox>
            </Box>
            <Flex justify='space-between'>
              <Link href={'/'} style={{ width: '47%' }}>
                <Image src="/bnr-usage.png" alt="" w='100%' h='auto' />
              </Link>
              <Link href={'/'} style={{ width: '47%' }}>
                <Image src="/bnr-report.png" alt="" w='100%' h='auto' />
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Layout>
    </>
  )
}
export default Mypage;