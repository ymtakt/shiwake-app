import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { Box, Flex, Select, useDisclosure, } from '@chakra-ui/react'
import { useAuth } from "../../src/atom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { format } from 'date-fns'
import ReactPaginate from 'react-paginate';

import { Layout } from '../../src/components/Layout'
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { SubText } from "../../src/Parts/SubText";
import { db } from "../../src/firebase";

import styles from '../../styles/Table.module.scss';
import { TableReports } from "../../src/components/TableReports";
import { DetailsModal } from "../../src/components/DetailsModal";
import { selectMonth } from "../../src/util";

export type Detail = {
  id: number;
  accountDebit: string;
  accountCredit: string;
  type: string;
  pl: string;
  payment: string;
  price: number;
  priceDebit: number;
  priceCredit: number;
  priceTaxDebit: number;
  priceTaxCredit: number;
  date: string;
  client: string;
  note: string;
  file: string;
  activeDebit: boolean;
  activeCredit: boolean;
  taxDebit: string;
  taxCredit: string;
}


const Mypage: NextPage = () => {
  const {
    nowtoday, lastMonth1, lastMonth2, lastMonth3, lastMonth4, lastMonth5, lastMonth6,
    lastMonth7, lastMonth8, lastMonth9, lastMonth10, lastMonth11 } = selectMonth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  //データのステート
  const [details, setDetails] = useState<any>([]);
  const [modalDetail, setModalDetail] = useState<any>({});

  const nowYear = format(nowtoday, 'yyyy年M月');
  const [year, setYear] = useState(nowYear.toString());
  const [type, setType] = useState("all");

  const [itemsOffset, setItemsOffset] = useState(0);

  //Recoilのログイン状態
  const user = useAuth();

  const itemsPerPage = 10;
  const endOffset = itemsOffset + itemsPerPage;
  const currentDetails = details.slice(itemsOffset, endOffset)
  const pageCount = Math.ceil(details.length / itemsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % details.length;
    setItemsOffset(newOffset);
  };

  const onOpenModal = (detail: {}) => {
    setModalDetail(detail)
    onOpen()
  }

  useEffect(() => {
    (async () => {
      if (user) {
        const ref = query(collection(db, 'users', user.uid, 'details'), where('yearAndMonth', '==', year.toString()), orderBy('date', 'desc'),);
        const docSnapw = await getDocs(ref);
        setDetails(docSnapw.docs.map((doc) => (
          { ...doc.data(), id: doc.id }
        )));
      }
    })()
  }, [user, year]);

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
            <TableReports detailList={currentDetails} type={type} onOpenModal={onOpenModal} />
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
      <DetailsModal isOpen={isOpen} onClose={onClose} modalDetail={modalDetail} />
    </>
  )
}
export default Mypage;