/* eslint-disable @next/next/no-img-element */
import { Flex, Text } from '@chakra-ui/react';
import Head from 'next/head'
import Link from 'next/link'

import FvImg from "public/fv-img.svg";
import styles from '../styles/Home.module.scss'


export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>収支管理はShiwake</title>
          <meta name="description" content="Shiwakeは日々の入出金を管理できるサービスです。" />
          <link rel="icon" href="/logo.png" />
        </Head>

        <header className={`${styles['l-header']}`}>
          <div className={`${styles['l-header_wrap']}`}>
            <div className={`${styles['l-header_left']}`}>
              <h1>
                <img src="/logo.png" alt="" />
              </h1>
            </div>
            <div className={`${styles['l-header_right']}`}>
              <nav className={`${styles['l-header_nav']}`}>
                <div className={`${styles['l-header_nav-link']} ${styles['l-header_nav-log']}`}>
                  <Link href={'/login'}>ログイン</Link>
                </div>
                <div className={`${styles['l-header_nav-link']} ${styles['l-header_nav-up']}`}>
                  <Link href={'/signup'}>新規登録</Link>
                </div>
              </nav>
            </div>
          </div>
        </header>

        <div className={`${styles['fv']}`}>
          <div className={`${styles['fv_ttl']}`}>
            <h2 className={`${styles['fv_ttl_sub']}`}>日々の仕訳けをシンプルに</h2>
            <h2>収支管理の<span>Shiwake</span></h2>
            <p className="">Shiwakeは日々の入出金を管理できるサービスです。</p>
          </div>
          <div className={`${styles['fv_link']}`}>
            <Link className={`${styles['arrow']}`} href={'/signup'} >新規登録はこちら</Link>
          </div>
          <div className={`${styles['fv_img']}`}>
            <FvImg />
          </div>
        </div>
        <footer className={styles.footer}>
          <Flex justify='center' align='center'>
            <Text fontSize='11px' mr='5px'>Powered by{' '}</Text>
            <Link href={'/'}>
              <img src="/logo.png" alt="" width='45px' />
            </Link>
          </Flex>
        </footer>
      </div >
    </>

  )


}
