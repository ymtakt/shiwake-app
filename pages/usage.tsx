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
              <h2>支出の登録方法</h2>
              <p>ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              <img src="/usage/usage-img01.jpg" alt="" />
              <p>ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              <img src="/usage/usage-img02.jpg" alt="" />
            </div>

            <div className={styles.container}>
              <h2>収入の登録方法</h2>
              <p>ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              <img src="/usage/usage-img03.jpg" alt="" />
              <p>ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト</p>
              <img src="/usage/usage-img04.jpg" alt="" />
            </div>
            <div className={styles.container}>
              <img src="/usage/usage-img05.jpg" alt="" />
            </div>
          </ContainerBox>
        </Box>
      </Layout>
    </>
  )
}
export default Mypage;