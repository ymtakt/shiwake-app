import { NextPage } from "next/types";
import { Box } from '@chakra-ui/react';
import Image from "next/image";

import { Layout } from '../src/components/Layout'
import { ContainerBox } from "../src/Parts/ContainerBox";
import { HeadSecond } from "../src/Parts/HeadSecond";

import styles from '../styles/Usage.module.scss'

const Mypage: NextPage = () => {


  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>使い方</HeadSecond>
          <ContainerBox>
            <div className={styles.container}>
              <h2>タイトル</h2>
              <p>ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              <img src="/bnr-usage.png" alt="" />
            </div>
          </ContainerBox>
        </Box>
      </Layout>
    </>
  )
}
export default Mypage;