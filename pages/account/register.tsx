import { NextPage } from "next/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Text, Flex, Select, Input, Textarea, Button, Image } from '@chakra-ui/react'
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Layout } from '../../src/components/Layout'
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { SubText } from "../../src/Parts/SubText";
import { Buttonsecondary } from "../../src/Parts/Buttonsecondary";
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";
import { app } from "../../src/firebase";
import { useAuth } from "../../src/atom";

import styles from '../../styles/Select.module.scss';

const Mypage: NextPage = () => {
  const [accountDebit, setAccountDebit] = useState("");
  const [accountCredit, setAccountCredit] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const [pl, setPl] = useState(true);
  const [payment, setPayment] = useState(true);

  //計算後の金額を登録
  const [calcPriceDebit, setCalcPriceDebit] = useState<number>();
  const [calcPriceCredit, setCalcPriceCredit] = useState<number>();

  const [calcTaxDebit, setCalcTaxDebit] = useState<number>();
  const [calcTaxCredit, setCalcTaxCredit] = useState<number>();

  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [file, setFile] = useState("");
  const [client, setClient] = useState("");

  const [src, setSrc] = useState('noimage.png');
  const [photoURL, setPhotoURL] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const [active, setActive] = useState<boolean>(true);
  const [tax, setTax] = useState('10%')

  const [active2, setActive2] = useState<boolean>(true);
  const [tax2, setTax2] = useState('10%')


  //Recoilのログイン状態
  const user = useAuth();

  //データベース接続
  const db = getFirestore(app);

  //ルーティング
  const router = useRouter();

  //ストレージ(画像用)
  const storage = getStorage();

  //今年
  // const selectedMonth = date.getMonth() + 1;
  const today = new Date();
  const thisYear = today.getFullYear();
  // console.log(thisYear);

  const classToggle = () => {
    setActive(!active)
    if (active === true) {
      setTax('0%')
    } else {
      setTax('10%')
    }
  }

  const classToggle2 = () => {
    setActive2(!active2)
    if (active2 === true) {
      setTax2('0%')
    } else {
      setTax2('10%')
    }
  }



  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
    if (active === true) {
      // setCalcPrice(Math.floor(Number(e.target.value) * 0.1 + Number(e.target.value)))
      setCalcTaxDebit(Math.floor(Number(e.target.value) * 0.1))

    } else {
      // setCalcPrice(Number(e.target.value))
      setCalcTaxDebit(0)
    }

    if (active2 === true) {
      // setCalcPriceCredit(Math.floor(Number(e.target.value) * 0.1 + Number(e.target.value)))
      setCalcTaxCredit(0)
    } else {
      // setCalcPriceCredit(Number(e.target.value))
      setCalcTaxCredit(Math.floor(Number(e.target.value) * 0.1))
    }
  }


  const handleChangePhotoURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const fileObject = e.target.files[0];
      setPhotoURL(fileObject)
      setSrc(window.URL.createObjectURL(fileObject));
      // console.log(e.target.files[0].name)
    }
    // setPhotoURL(e.target.files[0].name);
  }


  //仮登録
  const onClick = async () => {

    if (user) {
      const uid = user.uid

      if (photoURL) {
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomChar + "_" + photoURL.name;

        const mountainsRef = ref(storage, `${user.uid}/data/${fileName}`);
        console.log(storage)
        uploadBytes(mountainsRef, photoURL).then((url) => {
          console.log(url);
          getDownloadURL(mountainsRef).then(url => {
            console.log(url)
            setFile(url)
            console.log(file)

            addDoc(collection(db, "users", user.uid, "details"), {
              accountDebit,
              accountCredit,
              type,
              // price: calcPriceDebit,
              // price2: calcPriceCredit,
              price: Number(price),
              price2: Number(price),
              priceTax: calcTaxDebit,
              priceTax2: calcTaxCredit,
              date: new Date(date),
              timestamp: new Date(),
              year: new Date(date).getFullYear(),
              month: new Date(date).getMonth() + 1,
              yearAndMonth: `${new Date(date).getFullYear()}年${new Date(date).getMonth() + 1}月`,
              note,
              file: url,
              client,
              tax,
              tax2,
              active,
              active2,
              pl,
              payment,
            });
          })
        });
      } else {
        addDoc(collection(db, "users", user.uid, "details"), {
          accountDebit,
          accountCredit,
          type,
          // price: calcPrice,
          // price2: calcPrice2,
          price: Number(price),
          price2: Number(price),
          priceTax: calcTaxDebit,
          priceTax2: calcTaxCredit,
          date: new Date(date),
          timestamp: new Date(),
          year: new Date(date).getFullYear(),
          month: new Date(date).getMonth() + 1,
          yearAndMonth: `${new Date(date).getFullYear()}年${new Date(date).getMonth() + 1}月`,
          note,
          client,
          tax,
          tax2,
          active,
          active2,
          pl,
          payment,
        });
      }

      router.push("/account")
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (active === true) {
      // setCalcPriceDebit(calcPriceDebit)
      setCalcPriceDebit(Math.floor(Number(calcPriceDebit) * 0.1 + Number(calcPriceDebit)))
    } else {
      // setCalcPriceDebit(calcPriceDebit / (1 +))
      // // 11,880円÷（1＋10％）×10％＝1,080円
      const RATE = 0.1;  //8%
      //消費税計算（四捨五入）　※切捨てにしたい場合は、Math.floorに変更してください。
      setCalcPriceDebit(Math.round(Number(calcPriceDebit) / (1 + RATE)));
    }

    if (active2 === true) {
      // setCalcPriceDebit(calcPriceDebit)
      setCalcPriceCredit(Math.floor(Number(calcPriceCredit) * 0.1 + Number(calcPriceCredit)))
    } else {
      // setCalcPriceDebit(calcPriceDebit / (1 +))
      // // 11,880円÷（1＋10％）×10％＝1,080円
      const RATE = 0.1;  //8%
      //消費税計算（四捨五入）　※切捨てにしたい場合は、Math.floorに変更してください。
      setCalcPriceCredit(Math.round(Number(calcPriceCredit) / (1 + RATE)));
    }


  }, [active, active2]);

  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>新しい仕訳を登録</HeadSecond>
          <ContainerBox>
            <Flex marginBottom='30px'>
              <Box marginRight='25px'>
                <SubText marginBottom='10px'>
                  日付
                </SubText>
                <Input
                  type='date'
                  color='#65748A'
                  borderColor='#AAE2CF'
                  display='block'
                  cursor='pointer'
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </Box>
              <Box marginRight='25px'>
                <SubText marginBottom='10px'>
                  収支
                </SubText>
                <Select
                  borderColor='#AAE2CF'
                  color='#65748A'
                  fontWeight={'bold'}
                  cursor='pointer'
                  value={type}
                  onChange={e => setType(e.target.value)}
                >
                  <option >選択してください</option>
                  <option value='収入'>収入</option>
                  <option value='支出'>支出</option>
                </Select>
              </Box>
              <Box marginRight='25px'>
                <SubText marginBottom='10px'>
                  取引先
                </SubText>
                <Input
                  type='text'
                  placeholder="取引先"
                  color='#65748A'
                  borderColor='#AAE2CF'
                  marginRight='10px'
                  value={client}
                  onChange={e => setClient(e.target.value)}
                />
              </Box>
              <Box marginRight='25px'>
                <SubText marginBottom='10px'>
                  損益
                </SubText>
                <Select
                  borderColor='#AAE2CF'
                  color='#65748A'
                  fontWeight={'bold'}
                  cursor='pointer'
                  value={pl}
                  onChange={e => setPl(e.target.value)}
                >
                  <option value='true'>計算する</option>
                  <option value='false'>計算しない</option>
                </Select>
              </Box>
              <Box>
                <SubText marginBottom='10px'>
                  決済
                </SubText>
                <Select
                  borderColor='#AAE2CF'
                  color='#65748A'
                  fontWeight={'bold'}
                  cursor='pointer'
                  value={payment}
                  onChange={e => setPayment(e.target.value)}
                >
                  <option value='true'>完了</option>
                  <option value='false'>未完了</option>
                </Select>
              </Box>
            </Flex>

            <Flex justify='space-between' align='flex-start' marginBottom='30px'>
              <Box marginRight='25px'>
                <SubText marginBottom='10px'>
                  借方
                </SubText>
                <Flex marginBottom='15px'>
                  <Select className={styles.select} borderColor='#AAE2CF' marginRight='10px' color='#65748A' fontWeight={'bold'} placeholder="勘定科目" cursor='pointer' value={accountDebit}
                    onChange={e => setAccountDebit(e.target.value)}>
                    <option disabled>資産</option>
                    <option value="現金">&nbsp;&nbsp;&nbsp;&nbsp;現金</option>
                    <option value="預金-PayPay銀行">&nbsp;&nbsp;&nbsp;&nbsp;預金(PayPay銀行)</option>
                    <option value="売掛金">&nbsp;&nbsp;&nbsp;&nbsp;売掛金</option>
                    <option value="事業主貸">&nbsp;&nbsp;&nbsp;&nbsp;事業主貸</option>
                    <option disabled>負債</option>
                    <option value="買掛金">&nbsp;&nbsp;&nbsp;&nbsp;買掛金</option>
                    <option value="借入金">&nbsp;&nbsp;&nbsp;&nbsp;借入金</option>
                    <option value="未払金-アメックス">&nbsp;&nbsp;&nbsp;&nbsp;未払金(アメックス)</option>
                    <option value="未払金-MUFJ">&nbsp;&nbsp;&nbsp;&nbsp;未払金(MUFJ)</option>
                    <option value="前受金">&nbsp;&nbsp;&nbsp;&nbsp;前受金</option>
                    <option value="事業主借">&nbsp;&nbsp;&nbsp;&nbsp;事業主借</option>
                    <option disabled>純資産</option>

                    <option disabled>収益</option>
                    <option value="売上">&nbsp;&nbsp;&nbsp;&nbsp;売上</option>
                    <option disabled>費用</option>
                    <option value="水道光熱費">&nbsp;&nbsp;&nbsp;&nbsp;水道光熱費</option>
                    <option value="旅費交通費">&nbsp;&nbsp;&nbsp;&nbsp;旅費交通費</option>
                    <option value="通信費">&nbsp;&nbsp;&nbsp;&nbsp;通信費</option>
                    <option value="事務用品費">&nbsp;&nbsp;&nbsp;&nbsp;事務用品費</option>
                    <option value="広告宣伝費">&nbsp;&nbsp;&nbsp;&nbsp;広告宣伝費</option>
                    <option value="接待交際費">&nbsp;&nbsp;&nbsp;&nbsp;接待交際費</option>
                    <option value="損害保険料">&nbsp;&nbsp;&nbsp;&nbsp;損害保険料</option>
                    <option value="消耗品費">&nbsp;&nbsp;&nbsp;&nbsp;消耗品費</option>
                    <option value="減価償却費">&nbsp;&nbsp;&nbsp;&nbsp;減価償却費</option>
                    <option value="外注工賃">&nbsp;&nbsp;&nbsp;&nbsp;外注工賃</option>
                    <option value="地代家賃">&nbsp;&nbsp;&nbsp;&nbsp;地代家賃</option>
                    <option value="新聞図書費">&nbsp;&nbsp;&nbsp;&nbsp;新聞図書費</option>
                    <option value="車両関係費">&nbsp;&nbsp;&nbsp;&nbsp;車両関係費</option>
                    <option value="支払手数料">&nbsp;&nbsp;&nbsp;&nbsp;支払手数料</option>
                    <option value="諸会費">&nbsp;&nbsp;&nbsp;&nbsp;諸会費</option>
                    <option value="雑費">&nbsp;&nbsp;&nbsp;&nbsp;雑費</option>

                  </Select>
                  <Input
                    type='number'
                    placeholder="金額"
                    color='#65748A'
                    borderColor='#AAE2CF'
                    value={price}
                    onChange={e => changePrice(e)}
                  />
                </Flex>
                <Flex justifyContent='space-between'>
                  <Flex align='center'>
                    <SubText>
                      税率
                    </SubText>
                    <Button onClick={classToggle} className={active ? "tax" : ""} disabled={active ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={active ? '#3AA796' : '#fff'} color={active ? '#fff' : '#3AA796'} border={active ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                    <Button onClick={classToggle} className={active ? "" : "tax"} disabled={active ? false : true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={active ? '#fff' : '#3AA796'} color={active ? '#3AA796' : '#fff'} border={active ? '1px solid #3AA796' : 'none'} opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>                  </Flex>
                  <Box>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        税率
                      </SubText>
                      <Text>¥
                        {active
                          ? Math.floor(Number(price) * 0.1).toLocaleString()
                          : 0
                        }
                      </Text>
                    </Flex>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        合計
                      </SubText>
                      <Text>¥
                        {/* {active
                          ? Math.floor(Number(price) * 0.1 + Number(price)).toLocaleString()
                          : Number(price).toLocaleString()
                        } */}
                        {Number(price).toLocaleString()}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>

              <Box>
                <SubText marginBottom='10px'>
                  貸方
                </SubText>
                <Flex marginBottom='15px'>
                  <Select borderColor='#AAE2CF' marginRight='10px' color='#65748A' fontWeight={'bold'} placeholder="勘定科目" cursor='pointer' value={accountCredit}
                    onChange={e => setAccountCredit(e.target.value)}>
                    <option disabled>資産</option>
                    <option value="現金">&nbsp;&nbsp;&nbsp;&nbsp;現金</option>
                    <option value="預金-PayPay銀行">&nbsp;&nbsp;&nbsp;&nbsp;預金(PayPay銀行)</option>
                    <option value="売掛金">&nbsp;&nbsp;&nbsp;&nbsp;売掛金</option>
                    <option value="事業主貸">&nbsp;&nbsp;&nbsp;&nbsp;事業主貸</option>
                    <option disabled>負債</option>
                    <option value="買掛金">&nbsp;&nbsp;&nbsp;&nbsp;買掛金</option>
                    <option value="借入金">&nbsp;&nbsp;&nbsp;&nbsp;借入金</option>
                    <option value="未払金-アメックス">&nbsp;&nbsp;&nbsp;&nbsp;未払金(アメックス)</option>
                    <option value="未払金-MUFJ">&nbsp;&nbsp;&nbsp;&nbsp;未払金(MUFJ)</option>
                    <option value="前受金">&nbsp;&nbsp;&nbsp;&nbsp;前受金</option>
                    <option value="事業主借">&nbsp;&nbsp;&nbsp;&nbsp;事業主借</option>
                    <option disabled>純資産</option>

                    <option disabled>収益</option>
                    <option value="売上">&nbsp;&nbsp;&nbsp;&nbsp;売上</option>
                    <option disabled>費用</option>
                    <option value="水道光熱費">&nbsp;&nbsp;&nbsp;&nbsp;水道光熱費</option>
                    <option value="旅費交通費">&nbsp;&nbsp;&nbsp;&nbsp;旅費交通費</option>
                    <option value="通信費">&nbsp;&nbsp;&nbsp;&nbsp;通信費</option>
                    <option value="広告宣伝費">&nbsp;&nbsp;&nbsp;&nbsp;広告宣伝費</option>
                    <option value="接待交際費">&nbsp;&nbsp;&nbsp;&nbsp;接待交際費</option>
                    <option value="損害保険料">&nbsp;&nbsp;&nbsp;&nbsp;損害保険料</option>
                    <option value="消耗品費">&nbsp;&nbsp;&nbsp;&nbsp;消耗品費</option>
                    <option value="減価償却費">&nbsp;&nbsp;&nbsp;&nbsp;減価償却費</option>
                    <option value="福利厚生費">&nbsp;&nbsp;&nbsp;&nbsp;福利厚生費</option>
                    <option value="外注工賃">&nbsp;&nbsp;&nbsp;&nbsp;外注工賃</option>
                    <option value="地代家賃">&nbsp;&nbsp;&nbsp;&nbsp;地代家賃</option>
                    <option value="新聞図書費">&nbsp;&nbsp;&nbsp;&nbsp;新聞図書費</option>
                    <option value="車両関係費">&nbsp;&nbsp;&nbsp;&nbsp;車両関係費</option>
                    <option value="支払手数料">&nbsp;&nbsp;&nbsp;&nbsp;支払手数料</option>
                    <option value="諸会費">&nbsp;&nbsp;&nbsp;&nbsp;諸会費</option>
                    <option value="雑費">&nbsp;&nbsp;&nbsp;&nbsp;雑費</option>
                  </Select>
                  <Input
                    type='number'
                    placeholder="金額"
                    color='#65748A'
                    borderColor='#AAE2CF'
                    value={price}
                    onChange={e => changePrice(e)}
                  />
                </Flex>
                <Flex justifyContent='space-between'>
                  <Flex align='center'>
                    <SubText>
                      税率
                    </SubText>
                    <Button onClick={classToggle2} className={active2 ? "tax" : ""} disabled={active2 ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={active2 ? '#3AA796' : '#fff'} color={active2 ? '#fff' : '#3AA796'} border={active2 ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                    <Button onClick={classToggle2} className={active2 ? "" : "tax"} disabled={active2 ? false : true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={active2 ? '#fff' : '#3AA796'} color={active2 ? '#3AA796' : '#fff'} border={active2 ? '1px solid #3AA796' : 'none'} opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                  </Flex>
                  <Box>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        税率
                      </SubText>
                      <Text>¥
                        {active2
                          ? Math.floor(Number(price) * 0.1).toLocaleString()
                          : 0
                        }
                      </Text>
                    </Flex>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        合計
                      </SubText>
                      <Text>¥
                        {/* {active
                          ? Math.floor(Number(price) * 0.1 + Number(price)).toLocaleString()
                          : Number(price).toLocaleString()
                        } */}
                        {Number(price).toLocaleString()}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Flex>

            <Box marginBottom='30px'>
              <SubText marginBottom='10px'>
                書類データ
              </SubText>
              {/* <Input
                type='file'
                // value='ファイルを選択'
                // borderColor='#AAE2CF'
                cursor='pointer'
                value={file}
                onChange={e => setFile(e.target.value)}
              /> */}

              <Flex>
                {/* <Box ref={fileName}></Box> */}
                <Input
                  id="image"
                  ref={inputRef}
                  hidden
                  multiple
                  type="file"
                  accept="image/png,image/jpeg,image/gif/,application/pdf"
                  onChange={handleChangePhotoURL}
                />
                <Button
                  onClick={onButtonClick}
                  w='330px'
                  borderColor='#AAE2CF'
                >
                  ファイルを選択
                </Button>
                <Image src={src} alt="" display='block' w='48%' h='auto' marginLeft='auto' objectFit='cover' />
              </Flex>
            </Box>


            <Box marginBottom='30px'>
              <SubText marginBottom='10px'>
                備考
              </SubText>
              <Textarea
                borderColor='#AAE2CF'
                placeholder="例：取引の相手先や販売数量など"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </Box>

            <Box textAlign='right'>
              <Link href={'/account'}>
                <Buttonsecondary>キャンセル</Buttonsecondary>
              </Link>
              <ButtonPrimary onClick={onClick}>登録</ButtonPrimary>
            </Box>

          </ContainerBox>
        </Box>
      </Layout>
    </>
  )
}
export default Mypage;