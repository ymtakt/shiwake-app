import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import Link from "next/link";
import {
  Box, TableContainer, Table, Thead, Tbody, Th, Td, Tr, Button, Flex, Select, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
  Textarea,
  Image,
} from '@chakra-ui/react'
import { useAuth } from "../../src/atom";
import { collection, getFirestore, limit, onSnapshot, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { format } from 'date-fns'
import ReactPaginate from 'react-paginate';

import { Layout } from '../../src/components/Layout'
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { SubText } from "../../src/Parts/SubText";
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";
import { app } from "../../src/firebase";

import styles from '../../styles/Table.module.scss';





const Mypage: NextPage = () => {


  const { isOpen, onOpen, onClose } = useDisclosure();
  //データのステート
  const [details, setDetails] = useState<any>([]);
  // const [monthDetails, setMonthDetails] = useState<any>([]);
  // console.log(details)
  const [modalDetail, setModalDetail] = useState<any>({});
  // console.log(monthDetails.length)

  //Recoilのログイン状態
  const user = useAuth();

  // //データベース接続
  const db = getFirestore(app);

  //日付→今月
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const nowtoday = new Date();
  const lastMonth1 = today.setMonth(today.getMonth() - 1);
  const lastMonth2 = today.setMonth(today.getMonth() - 1);
  const lastMonth3 = today.setMonth(today.getMonth() - 1);
  const lastMonth4 = today.setMonth(today.getMonth() - 1);
  const lastMonth5 = today.setMonth(today.getMonth() - 1);
  const lastMonth6 = today.setMonth(today.getMonth() - 1);
  const lastMonth7 = today.setMonth(today.getMonth() - 1);
  const lastMonth8 = today.setMonth(today.getMonth() - 1);
  const lastMonth9 = today.setMonth(today.getMonth() - 1);
  const lastMonth10 = today.setMonth(today.getMonth() - 1);
  const lastMonth11 = today.setMonth(today.getMonth() - 1);
  const nowYear = format(nowtoday, 'yyyy年M月');

  const [year, setYear] = useState(nowYear.toString());
  const [type, setType] = useState("all");

  const typeAll = "all";

  const itemsPerPage = 10;

  //最初の数字
  const [itemsOffset, setItemsOffset] = useState(0);
  //次の頭数
  const endOffset = itemsOffset + itemsPerPage;
  const currentDetails = details.slice(itemsOffset, endOffset)

  const pageCount = Math.ceil(details.length / itemsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % details.length;
    // console.log(
    //   `User requested page number ${e.selected}, which is offset ${newOffset}`
    // );
    setItemsOffset(newOffset);
  };

  const onOpenModal = (detail: {}) => {
    setModalDetail(detail)
    onOpen()
  }


  useEffect(() => {
    (async () => {

      if (user) {
        //ユーザーデータ読み込み
        const usersCollectionRef = await collection(db, 'users', user.uid, 'details');
        const qSuma = query(usersCollectionRef,
          where('yearAndMonth', '==', year.toString()),
          // where('type', '==', type),
          orderBy('date', 'desc'),
          // startAt(currentPage)
        );

        //今月の内容全て読み込み
        const qSum = query(usersCollectionRef,
          where('yearAndMonth', '==', year.toString()),
          // where('type', '==', type),
          orderBy('date', 'desc'),
          // limit(pageSize),
          // startAt(currentPage)
        );
        await onSnapshot(
          qSum, (snapshot) => setDetails(snapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
          ))), //取得時にidをdoc.idにする
          (error) => {
            console.log(error.message);
            console.log('err');
          },
        );

      }

    })()

  }, [user, type, year]);

  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>仕訳一覧</HeadSecond>
          <ContainerBox>
            <Flex marginBottom='45px'>
              <Box marginRight='25px'>
                <SubText marginBottom='10px'>
                  期間
                </SubText>
                <Select borderColor='#3AA796' color='#3AA796' fontWeight={'bold'} value={year}
                  onChange={e => setYear(e.target.value)}>
                  <option value={format(lastMonth11, 'yyyy年M月')}>{format(lastMonth11, 'yyyy年M月')}</option>
                  <option value={format(lastMonth10, 'yyyy年M月')}>{format(lastMonth10, 'yyyy年M月')}</option>
                  <option value={format(lastMonth9, 'yyyy年M月')}>{format(lastMonth9, 'yyyy年M月')}</option>
                  <option value={format(lastMonth8, 'yyyy年M月')}>{format(lastMonth8, 'yyyy年M月')}</option>
                  <option value={format(lastMonth7, 'yyyy年M月')}>{format(lastMonth7, 'yyyy年M月')}</option>
                  <option value={format(lastMonth6, 'yyyy年M月')}>{format(lastMonth6, 'yyyy年M月')}</option>
                  <option value={format(lastMonth5, 'yyyy年M月')}>{format(lastMonth5, 'yyyy年M月')}</option>
                  <option value={format(lastMonth4, 'yyyy年M月')}>{format(lastMonth4, 'yyyy年M月')}</option>
                  <option value={format(lastMonth3, 'yyyy年M月')}>{format(lastMonth3, 'yyyy年M月')}</option>
                  <option value={format(lastMonth2, 'yyyy年M月')}>{format(lastMonth2, 'yyyy年M月')}</option>
                  <option value={format(lastMonth1, 'yyyy年M月')}>{format(lastMonth1, 'yyyy年M月')}</option>
                  <option value={format(nowtoday, 'yyyy年M月')}>{format(nowtoday, 'yyyy年M月')}</option>
                </Select>
              </Box>
              <Box>
                <SubText marginBottom='10px'>
                  カテゴリー
                </SubText>
                <Select borderColor='#3AA796' color='#3AA796' fontWeight={'bold'} value={type} onChange={e => setType(e.target.value)}>
                  <option value='all'>全て</option>
                  <option value='収入'>収入</option>
                  <option value='支出'>支出</option>
                </Select>
              </Box>
            </Flex>

            <Box marginBottom='45px'>
              <TableContainer maxWidth='100%' whiteSpace='pre-wrap' className={styles.table}>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th className={styles.table_first}></Th>
                      <Th>決済</Th>
                      <Th>借方</Th>
                      <Th>貸方</Th>
                      <Th>金額</Th>
                      <Th>摘要</Th>
                      <Th>取引先</Th>
                      <Th>取引日</Th>
                      <Th className={styles.table_last}></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentDetails.map((detail: any) => {
                      const detailInfo = {
                        id: detail.id,
                        accountDebit: detail.accountDebit,
                        accountCredit: detail.accountCredit,
                        type: detail.type, pl: detail.pl,
                        payment: detail.payment,
                        price: detail.price,
                        price2: detail.price2,
                        priceTax: detail.priceTax,
                        priceTax2: detail.priceTax2,
                        date: format(detail.date.toDate(), 'yyyy-M-d'),
                        client: detail.client,
                        note: detail.note,
                        file: detail.file,
                        active: detail.active as boolean,
                        active2: detail.active2 as boolean,
                        tax: detail.tax,
                        tax2: detail.tax2
                      };
                      if (type === 'all') {
                        return (
                          user !== null && (
                            <Tr key={detail.id}>
                              {/* {console.log(detail.date.toDate())} */}
                              {detail.type === '収入' && (
                                <Td className={styles.table_first} color='#00536C' fontWeight='600' >{detail.type}</Td>
                              )}
                              {detail.type === '支出' && (
                                <Td className={styles.table_first} color='#E53E3E' fontWeight='600' >{detail.type}</Td>
                              )
                              }
                              {detail.payment === 'true' && (
                                <Td color='#00536C' fontWeight='600' ></Td>
                              )}
                              {detail.payment === 'false' && (
                                <Td className={styles.table_payment} color='#E53E3E' fontWeight='600' ><Image src="/check.svg" w='1em' h='1em' alt="" /></Td>
                              )
                              }
                              <Td >{detail.accountDebit}</Td>
                              <Td >{detail.accountCredit}</Td>
                              {
                                detail.type === '収入' && (
                                  <Td>+{Number(detail.price).toLocaleString()}円</Td>
                                )
                              }
                              {
                                detail.type === '支出' && (
                                  <Td>-{Number(detail.price).toLocaleString()}円</Td>
                                )
                              }
                              < Td w='20.3%' fontSize='xs' > {detail.note}</Td>
                              <Td>{detail.client}</Td>
                              <Td>{format(detail.date.toDate(), 'yyyy年M月d日')}</Td>
                              <Td isNumeric w='12%' className={styles.table_last_list}>
                                <Button onClick={() => onOpenModal(detail)} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                                <Link
                                  as={`/account/${detail.id}`}
                                  href={{ pathname: `/account/[id]`, query: detailInfo }}
                                >
                                  <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                                </Link>
                              </Td>
                            </Tr>
                          )
                        )
                      } else if (type === '収入') {
                        return (
                          user !== null && (
                            '収入' === detail.type && (
                              <Tr key={detail.id}>
                                {/* {console.log(detail.date.toDate())} */}
                                {detail.type === '収入' && (
                                  <Td className={styles.table_first} color='#00536C' fontWeight='600' >{detail.type}</Td>
                                )}
                                {detail.type === '支出' && (
                                  <Td className={styles.table_first} color='#E53E3E' fontWeight='600' >{detail.type}</Td>
                                )
                                }
                                {detail.type === '収入' && (
                                  <Td color='#00536C' fontWeight='600' ></Td>
                                )}
                                {detail.type === '支出' && (
                                  <Td className={styles.table_payment} color='#E53E3E' fontWeight='600' ><Image src="/check.svg" w='1em' h='1em' /></Td>
                                )
                                }
                                <Td >{detail.accountDebit}</Td>
                                <Td >{detail.accountCredit}</Td>
                                {
                                  detail.type === '収入' && (
                                    <Td>+{detail.price}</Td>
                                  )
                                }
                                {
                                  detail.type === '支出' && (
                                    <Td>-{detail.price}</Td>
                                  )
                                }
                                < Td w='20.3%' fontSize='xs' > {detail.note}</Td>
                                <Td>{detail.client}</Td>
                                <Td>{format(detail.date.toDate(), 'yyyy年M月d日')}</Td>
                                <Td isNumeric w='12%' className={styles.table_last_list}>
                                  <Button onClick={() => onOpenModal(detail)} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                                  <Link
                                    as={`/account/${detail.id}`}
                                    href={{ pathname: `/account/[id]`, query: detailInfo }}
                                  >
                                    <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                                  </Link>
                                </Td>
                              </Tr>
                            )
                          )
                        )
                      } else if (type === '支出') {
                        return (
                          user !== null && (
                            '支出' === detail.type && (
                              <Tr key={detail.id}>
                                {/* {console.log(detail.date.toDate())} */}
                                {detail.type === '収入' && (
                                  <Td className={styles.table_first} color='#00536C' fontWeight='600' >{detail.type}</Td>
                                )}
                                {detail.type === '支出' && (
                                  <Td className={styles.table_first} color='#E53E3E' fontWeight='600' >{detail.type}</Td>
                                )
                                }
                                {detail.type === '収入' && (
                                  <Td color='#00536C' fontWeight='600' ></Td>
                                )}
                                {detail.type === '支出' && (
                                  <Td className={styles.table_payment} color='#E53E3E' fontWeight='600' ><Image src="/check.svg" w='1em' h='1em' /></Td>
                                )
                                }
                                <Td >{detail.accountDebit}</Td>
                                <Td >{detail.accountCredit}</Td>
                                {
                                  detail.type === '収入' && (
                                    <Td>+{detail.price}</Td>
                                  )
                                }
                                {
                                  detail.type === '支出' && (
                                    <Td>-{detail.price}</Td>
                                  )
                                }
                                < Td w='20.3%' fontSize='xs' > {detail.note}</Td>
                                <Td>{detail.client}</Td>
                                <Td>{format(detail.date.toDate(), 'yyyy年M月d日')}</Td>
                                <Td isNumeric w='12%' className={styles.table_last_list}>
                                  <Button onClick={() => onOpenModal(detail)} display='inline-block' h='auto' p='8px 7px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>詳細</Button>
                                  <Link
                                    as={`/account/${detail.id}`}
                                    href={{ pathname: `/account/[id]`, query: detailInfo }}
                                  >
                                    <Button display='inline-block' h='auto' p='8px 7px' marginLeft='8px' backgroundColor='#3AA796' color='white' fontSize='12px' textAlign='center'>編集</Button>
                                  </Link>
                                </Td>
                              </Tr>
                            )
                          )
                        )
                      }
                    })}
                  </Tbody>

                </Table>
              </TableContainer>
            </Box>

            <nav style={{ textAlign: 'center' }}>
              <ReactPaginate
                breakLabel="..."
                nextLabel="前"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="後"
                className={styles.navigation}
                activeClassName={styles.active}
              />
            </nav>
          </ContainerBox>
        </Box>
      </Layout >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='1024px' marginTop='55px'>
          <ModalHeader>仕訳詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContainerBox>
              <Flex marginBottom='30px'>
                <Box marginRight='25px'>
                  <SubText marginBottom='10px'>
                    日付
                  </SubText>
                  <Text minW='210px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.date && format(modalDetail.date.toDate(), 'yyyy年M月d日')}</Text>
                </Box>
                <Box marginRight='25px'>
                  <SubText marginBottom='10px'>
                    収支
                  </SubText>
                  <Text minW='75px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.type}</Text>
                </Box>
                <Box marginRight='25px'>
                  <SubText marginBottom='10px'>
                    取引先
                  </SubText>
                  <Text minW='210px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.client}</Text>
                </Box>
                <Box marginRight='25px'>
                  <SubText marginBottom='10px'>
                    損益
                  </SubText>
                  <Text minW='75px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>
                    {modalDetail.pl === true
                      ?
                      '計算する'
                      :
                      '計算しない'
                    }
                  </Text>
                </Box>
                <Box>
                  <SubText marginBottom='10px'>
                    決済
                  </SubText>
                  <Text minW='75px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>
                    {modalDetail.payment === true
                      ?
                      '完了'
                      :
                      '未完了'
                    }
                  </Text>
                </Box>
              </Flex>

              <Flex justify='space-between' align='flex-start' marginBottom='30px'>
                <Box marginRight='25px'>
                  <SubText marginBottom='10px'>
                    借方
                  </SubText>
                  <Flex marginBottom='15px'>
                    <Text minW='210px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px' marginRight='25px'>{modalDetail.accountDebit}</Text>
                    <Text minW='210px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.price}</Text>

                  </Flex>
                  <Flex justifyContent='space-between'>
                    <Flex align='center'>
                      <SubText>
                        税率
                      </SubText>
                      {modalDetail.tax === '10%'
                        &&
                        <>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='#fff' opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#fff' color='#3AA796' border='1px solid #3AA796' opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                        </>
                      }
                      {modalDetail.tax === '0%'
                        &&
                        <>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#fff' color='#3AA796' border='1px solid #3AA796' opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='#fff' opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                        </>
                      }
                    </Flex>
                    <Box>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          税率
                        </SubText>
                        <Text>¥{Number(modalDetail.priceTax).toLocaleString()}</Text>
                      </Flex>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          合計
                        </SubText>
                        <Text>¥{Number(modalDetail.price).toLocaleString()}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <SubText marginBottom='10px'>
                    貸方
                  </SubText>
                  <Flex marginBottom='15px'>
                    <Text minW='210px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px' marginRight='25px'>{modalDetail.accountCredit}</Text>
                    <Text minW='210px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.price}</Text>
                  </Flex>
                  <Flex justifyContent='space-between'>
                    <Flex align='center'>
                      <SubText>
                        税率
                      </SubText>
                      {modalDetail.tax2 === '10%'
                        &&
                        <>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='#fff' opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#fff' color='#3AA796' border='1px solid #3AA796' opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                        </>
                      }
                      {modalDetail.tax2 === '0%'
                        &&
                        <>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#fff' color='#3AA796' border='1px solid #3AA796' opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                          <Button disabled={true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor='#3AA796' color='#fff' opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                        </>
                      }
                    </Flex>
                    <Box>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          税率
                        </SubText>
                        <Text>¥{Number(modalDetail.priceTax2).toLocaleString()}</Text>
                      </Flex>
                      <Flex align='center' justifyContent='space-between'>
                        <SubText>
                          合計
                        </SubText>
                        <Text>¥{Number(modalDetail.price).toLocaleString()}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Flex>

              <Box marginBottom='30px'>
                <SubText marginBottom='10px'>
                  書類データ
                </SubText>
                <Image src={modalDetail.file} alt="" display='block' w='60%' h='auto' objectFit='cover' />
              </Box>


              <Box marginBottom='30px'>
                <SubText marginBottom='10px'>
                  備考
                </SubText>
                <Text minW='210px' minH='38px' fontSize='15px' color='#65748A' padding='8px 16px' border='#AAE2CF 1px solid' borderRadius='5px'>{modalDetail.note}</Text>
              </Box>

            </ContainerBox>
          </ModalBody>
          <ModalFooter>
            <ButtonPrimary onClick={onClose}>閉じる</ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}
export default Mypage;