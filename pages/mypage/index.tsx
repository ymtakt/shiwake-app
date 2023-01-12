import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import Link from "next/link";
import { Flex, Box, Image, Text, TableContainer, Table, Thead, Tbody, Th, Td, Tr } from '@chakra-ui/react'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { format } from 'date-fns'

import { Layout } from '../../src/components/Layout'
import { ButtonPrimary } from "../../src/components/ButtonPrimary";
import { ContainerBox } from "../../src/components/ContainerBox";
import { HeadSecond } from "../../src/components/HeadSecond";
import { SubText } from "../../src/components/SubText";
import { useAuth } from "../../src/atom";

import styles from '../../styles/Table.module.scss';
import { db } from "../../src/firebase";
import { createPositiveAndNegativeNumArray } from "../../src/util";

const Mypage: NextPage = () => {

  //これまで全て5個まで
  const [details, setDetails] = useState<any>([]);
  //今月の内容全て
  const [detailsMonth, setDetailsMonth] = useState<any>([]);

  //画像のステート
  const [src, setSrc] = useState<any>();

  //Recoilのログイン状態
  const user = useAuth();

  //日付→今月
  const today = new Date();
  const thisMonth = today.getMonth() + 1;

  const { plus, minus } = createPositiveAndNegativeNumArray(detailsMonth);
  const monthAnser = plus - minus;

  useEffect(() => {
    (async () => {
      if (user) {
        //今月の全て5個まで読み込み
        const ref = query(collection(db, 'users', user.uid, 'details'), where("month", "==", thisMonth), orderBy('date', 'desc'), limit(5));
        const docSnapw = await getDocs(ref);
        setDetails(docSnapw.docs.map((doc) => (
          { ...doc.data(), id: doc.id }
        )));

        //今月の内容全て読み込み
        const refa = query(collection(db, 'users', user.uid, 'details'), where("month", "==", thisMonth));
        const docSnapwa = await getDocs(refa);
        setDetailsMonth(docSnapwa.docs.map((doc) => (
          { ...doc.data(), id: doc.id }
        )));

        // ユーザーのphotoURLを取得
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSrc(docSnap.data().photoURL);
        } else {
          console.log("No such document!");
        }
      }
    })()
  }, [user, src]);


  return (
    <>
      <Layout>
        <Flex justify='space-between' display={{ base: "block", md: "flex" }}>
          <Box w={{ base: "100%", md: "47%" }} marginBottom={{ base: "45px", md: "0" }} >
            <HeadSecond>今月の仕訳</HeadSecond>
            <ContainerBox>
              <Box marginBottom='40px' borderBottom='1px solid #D9E0E8' >
                <SubText marginBottom='10px'>
                  収支合計
                </SubText>
                <Text textAlign='right' fontSize='30px' color='#162533'>
                  {/* 合計値(全てプラス) */}
                  {
                    monthAnser.toLocaleString()
                  }
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
                      {details.map((detail: any) => {
                        return (
                          user !== null && (
                            <Tr key={detail.id}>
                              {detail.type === '収入' && (
                                <Td className={styles.table_first}>{detail.accountCredit}</Td>
                              )}
                              {detail.type === '支出' && (
                                <Td className={styles.table_first}>{detail.accountDebit}</Td>
                              )
                              }
                              {detail.type === '収入' && (
                                <Td>+{detail.price.toLocaleString()}円</Td>
                              )}
                              {detail.type === '支出' && (
                                <Td>-{detail.price.toLocaleString()}円</Td>
                              )
                              }
                              <Td isNumeric className={styles.table_last}>{format(detail.date.toDate(), 'yyyy年M月d日')}</Td>
                            </Tr>
                          )
                        )
                      })}
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
          <Box w={{ base: "100%", md: "47%" }}>
            <Box marginBottom='45px'>
              <HeadSecond>アカウント情報</HeadSecond>
              <ContainerBox>
                <Flex display={{ base: "block", md: "flex" }} align='flex-start' justify='space-between' marginBottom='45px'>
                  {src ?
                    <Image src={src} alt="" w='85px' h='85px' borderRadius='50%' objectFit='cover' />
                    :
                    <Image src='/profire-default.svg' alt="" w='85px' h='85px' borderRadius='50%' objectFit='cover' />
                  }
                  <Box w={{ base: "100%", md: "255px" }} marginTop={{ base: "35px", md: "0" }}>
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
              <Link href={'/usage'} style={{ width: '47%' }}>
                <Image src="/bnr-usage.png" alt="" w='100%' h='auto' border='4px solid #673B00' />
              </Link>
              <Link href={'/report'} style={{ width: '47%' }}>
                <Image src="/bnr-report.png" alt="" w='100%' h='auto' border='4px solid #229C8B' />
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Layout >
    </>
  )
}
export default Mypage;