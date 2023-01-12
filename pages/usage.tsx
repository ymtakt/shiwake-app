/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next/types";
import { Box } from '@chakra-ui/react';
import Image from "next/image";

import { Layout } from '../src/components/Layout'
import { ContainerBox } from "../src/components/ContainerBox";
import { HeadSecond } from "../src/components/HeadSecond";

import styles from '../styles/Usage.module.scss'
import { accountName } from "../src/util";

const Mypage: NextPage = () => {
  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>使い方</HeadSecond>
          <ContainerBox>
            <div className={styles.container}>
              <h2>仕訳の入力方法</h2>
              <p>サイドメニュー「仕訳入力」または、マイページ「仕訳を登録する」より入力ページに進みます。</p>
              <img src="/usage/usage-img01.jpg" alt="" />
              <h2>入力項目</h2>
              <p>「収入」「支出」共に入力画面は同じで、収支項目より選択をします。<br />
                <small>
                  ※は必須項目になります。
                </small>
              </p>
              <img src="/usage/usage-img02.jpg" alt="" />
              <h3>登録内容</h3>
              <p>登録内容は下記になります。</p>
              <div className={styles.table}>
                <dl>
                  <dt>{accountName.date}</dt>
                  <dd>発生日を選択します。</dd>
                  <dt>{accountName.payments}</dt>
                  <dd>「収入」「支出」を選択します。</dd>
                  <dt>{accountName.client}</dt>
                  <dd>取引先名を入力します。</dd>
                  <dt>{accountName.pl}</dt>
                  <dd>損益計算(レポート)をするかしないかを選択します。</dd>
                  <dt>{accountName.settlement}</dt>
                  <dd>決済が完了している処理かを入力します。</dd>
                  <dt>{accountName.debit}</dt>
                  <dd>借方の金額・勘定科目・税区分を入力します。</dd>
                  <dt>{accountName.credit}</dt>
                  <dd>貸方の金額・勘定科目・税区分を入力します。</dd>
                  <dt>{accountName.image}</dt>
                  <dd>書類データを保存します。</dd>
                  <dt>{accountName.remarks}</dt>
                  <dd>自由にメモとして情報を記載します。</dd>

                </dl>
              </div>
            </div>
            <div className={styles.container}>
              <h2>収入の入力例</h2>
              <p>収入の入力パターン主な例は下記になります。</p>
              <h3>口座入金の場合</h3>
              <p>(預金)PayPay銀行/売上高&nbsp;&nbsp;<span className={styles.red}>損益+</span>&nbsp;&nbsp;<span>決済完了</span><br />
                <small>計算項目=貸方</small></p>

              <h3>個人口座からの売上</h3>
              <p>現金or事業主貸/売上&nbsp;&nbsp;<span className={styles.red}>損益+</span>&nbsp;&nbsp;<span>決済完了</span><br />
                <small>計算項目=貸方</small></p>

              <h3>前受金処理の場合</h3>
              <p>①(預金)PayPay銀行/前受金&nbsp;&nbsp;<span>損益計算なし</span>&nbsp;&nbsp;<span>未決済</span><br />
              </p>

              <p>②前受金/売上&nbsp;&nbsp;<span className={styles.red}>損益+</span>&nbsp;&nbsp;<span>決済完了</span><br />
                <small>計算項目=貸方</small></p>

              <p>③売掛金/売上&nbsp;&nbsp;<span className={styles.red}>損益+</span>&nbsp;&nbsp;<span>決済完了</span><br />
                <small>計算項目=貸方</small></p>

              <p>④(預金)PayPay銀行/売掛金&nbsp;&nbsp;<span>損益計算なし</span>&nbsp;&nbsp;<span>決済完了→このタイミングで①を決済完了に</span><br />
              </p>

              <h3>売掛金処理の場合</h3>
              <p>①売掛金/売上&nbsp;&nbsp;<span className={styles.red}>損益+</span>&nbsp;&nbsp;<span>未決済</span><br />
                <small>計算項目=貸方</small></p>

              <p>②(預金)PayPay銀行/売掛金&nbsp;&nbsp;<span>損益計算なし</span>&nbsp;&nbsp;<span>決済完了→このタイミングで①を決済完了に</span><br />
              </p>

            </div>
            <div className={styles.container}>
              <h2>支出の入力例</h2>
              <p>支出の入力パターン主な例は下記になります。</p>

              <h3>事業用口座引き落とし</h3>
              <p>交際費/(預金)PayPay銀行&nbsp;&nbsp;<span className={styles.blue}>損益-</span>&nbsp;&nbsp;<span>決済完了</span><br />
                <small>計算項目=借方</small></p>

              <h3>事業クレジット支払い</h3>
              <p>①交際費/未払金(アメックス)&nbsp;&nbsp;<span>損益計算なし</span>&nbsp;&nbsp;<span>未決済</span><br />
              </p>

              <p>②未払金(アメックス)/(預金)PayPay銀行&nbsp;&nbsp;<span className={styles.blue}>損益-</span>&nbsp;&nbsp;<span>決済完了→このタイミングで①を決済完了に</span><br />
                <small>計算項目=借方</small></p>

              <h3>個人クレジット支払い</h3>
              <p>①交際費/未払金(MUFJ)&nbsp;&nbsp;<span>損益計算なし</span>&nbsp;&nbsp;<span>未決済</span></p>

              <p>②未払金(MUFJ)/事業主借&nbsp;&nbsp;<span className={styles.blue}>損益-</span>&nbsp;&nbsp;<span>決済完了→このタイミングで①を決済完了に</span><br />
                <small>計算項目=借方</small></p>

              <h3>プライベート用引き出し</h3>
              <p>事業主貸/(預金)PayPay銀行&nbsp;&nbsp;<span className={styles.blue}>損益-</span>&nbsp;&nbsp;<span>決済完了</span><br />
                <small>計算項目=借方</small></p>

              <h3>プライベート資金からの支払い</h3>
              <p>現金/事業主借&nbsp;&nbsp;<span className={styles.red}>損益+</span>&nbsp;&nbsp;<span>決済完了</span><br />
                <small>↑収入処理<br />
                  計算項目=貸方</small></p>

              <p>旅費交通費/現金&nbsp;&nbsp;<span className={styles.blue}>損益-</span>&nbsp;&nbsp;<span>決済完了</span><br />
                <small>計算項目=借方</small></p>

            </div>
            <div className={styles.container}>
              <div className={styles.caption}>
                <p>
                  決済の完了・未完了は単純に未払いなど決済が完了していないかなどの確認項目→完了したら編集します。

                </p>
              </div>
            </div>
          </ContainerBox>
        </Box>
      </Layout>
    </>
  )
}
export default Mypage;