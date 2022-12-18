import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Text, Flex, Select, Input, Textarea, Button, Image } from '@chakra-ui/react'
import { collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Layout } from '../../src/components/Layout'
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";

import { SubText } from "../../src/Parts/SubText";
import { Buttonsecondary } from "../../src/Parts/Buttonsecondary";
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";
import { useAuth } from "../../src/atom";
import { app } from "../../src/firebase";
import { format } from "date-fns";


const Id = () => {
  //Recoilのログイン状態
  const user = useAuth();
  //データベース接続
  const db = getFirestore(app);
  //ルーティング
  const router = useRouter();
  //ストレージ(画像用)
  const storage = getStorage();


  const [accountDebit, setAccountDebit] = useState(router.query.accountDebit);
  const [accountCredit, setAccountCredit] = useState(router.query.accountCredit);
  const [type, setType] = useState(router.query.type);
  const [price, setPrice] = useState(router.query.price);
  const [note, setNote] = useState(router.query.note);
  const [date, setDate] = useState(new Date());

  const [file, setFile] = useState(router.query.file);
  const [client, setClient] = useState(router.query.client);

  //計算後の金額を登録
  const [pr, setPr] = useState<any>(router.query.price);
  const [pr2, setPr2] = useState<any>(router.query.price);

  const [afterPrice, setAfterPrice] = useState("");

  const [photoURL, setPhotoURL] = useState<any>(router.query.file);


  const inputRef = useRef<HTMLInputElement>(null);
  const boolean = router.query.active

  const boo = boolean === "true" ? true : false

  const [active, setActive] = useState(boo);
  const [tax, setTax] = useState(router.query.tax)

  const taxDef = router.query.tax

  const classToggle = () => {
    setActive(!active)
    if (taxDef === '10%') {
      if (tax === '10%') {
        setTax('0%')
        const RATE = 0.1;
        setPr2(Math.round(Number(pr) / (1 + RATE)));
      } else {
        setTax('10%')
        setPr2(Number(pr))
      }

    } else if (taxDef === '0%') {
      if (tax === '0%') {
        setTax('10%')
        setPr2(Math.floor(Number(pr) * 0.1 + Number(pr)))
      } else {
        setTax('0%')
        setPr2(Number(pr))
      }
    }
  }


  const changePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setAfterPrice(e.target.value)

    if (taxDef === '10%') {
      if (tax === '10%') {
        setPr(Math.floor(Number(e.target.value) * 0.1 + Number(e.target.value)))
        setPr2(Math.floor(Number(e.target.value) * 0.1 + Number(e.target.value)))
      } else {
        setPr(Number(e.target.value))
        setPr2(Number(e.target.value))
      }
    } else if (taxDef === '0%') {
      if (tax === '0%') {
        setPr(Number(e.target.value))
        setPr2(Number(e.target.value))
      } else {
        // const RATE = 0.1;
        // setPr(Math.round(Number(e.target.value) / (1 + RATE)));
        // setPr2(Math.round(Number(e.target.value) / (1 + RATE)));
        setPr(Math.floor(Number(e.target.value) * 0.1 + Number(e.target.value)))
        setPr2(Math.floor(Number(e.target.value) * 0.1 + Number(e.target.value)))
      }
    }
  }

  console.log(taxDef)
  // console.log(active)
  console.log(tax)
  console.log(pr2)
  // console.log(pr)

  const handleChangePhotoURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const fileObject = e.target.files[0];
      setFile(window.URL.createObjectURL(fileObject));

      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + fileObject.name;

      const mountainsRef = ref(storage, `${user.uid}/data/${fileName}`);
      console.log(storage)
      uploadBytes(mountainsRef, fileObject).then((url) => {
        console.log(url)
        getDownloadURL(mountainsRef).then(url => {
          setPhotoURL(url);
          console.log(url)
        });
      });

    }
  }


  const onClickDelete = async (id: string | undefined) => {
    if (user) {
      await deleteDoc(doc(db, "users", user.uid, "details", id));
      router.push("/account")
    }
  }

  const onClickAdd = (e: React.ChangeEvent<HTMLFormElement>) => {
    const usersRef = collection(db, "users", user.uid, "details")
    const id = router.query.id as string
    const price = Number(pr2)

    setDoc(doc(usersRef, id), {
      uid: user?.uid,
      accountDebit,
      accountCredit,
      type,
      price,
      date: new Date(date),
      timestamp: new Date(),
      year: new Date(date).getFullYear(),
      month: new Date(date).getMonth() + 1,
      yearAndMonth: `${new Date(date).getFullYear()}年${new Date(date).getMonth() + 1}月`,
      note,
      client,
      file: photoURL,
      tax
    });

    setAccountDebit("")
    setAccountCredit("")
    setType("")
    setPrice("")
    setNote("")
    // setDate("")
    setFile("")
    setClient("")
    setPr("")
    setPr2("")
    setAfterPrice("")
    setPhotoURL("")
    // setActive("")
    setTax("")
    router.push("/account");
    router.reload
  }


  const onButtonClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    (async () => {
      setActive(boo)

    })()
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        //ユーザーデータ読み込み
        const usersCollectionRef = await collection(db, 'users', user.uid, 'details');
      }
    })()
  }, [user]);



  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>{router.query.id}の仕訳編集</HeadSecond>
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
                  defaultValue={date}
                  // value={newDate}
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
              <Box>
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
            </Flex>

            <Flex justify='space-between' align='flex-start' marginBottom='30px'>
              <Box marginRight='25px'>
                <SubText marginBottom='10px'>
                  借方
                </SubText>
                <Flex marginBottom='15px'>
                  <Select borderColor='#AAE2CF' marginRight='10px' color='#65748A' fontWeight={'bold'} placeholder="勘定科目" cursor='pointer' value={accountDebit}
                    onChange={e => setAccountDebit(e.target.value)}>
                    <option disabled>資産</option>
                    <option value="現金">&nbsp;&nbsp;&nbsp;&nbsp;現金</option>
                    <option value="預金">&nbsp;&nbsp;&nbsp;&nbsp;預金</option>
                    <option value="定期預金">&nbsp;&nbsp;&nbsp;&nbsp;定期預金</option>
                    <option value="売掛金">&nbsp;&nbsp;&nbsp;&nbsp;売掛金</option>
                    <option value="有価証券">&nbsp;&nbsp;&nbsp;&nbsp;有価証券</option>
                    <option value="棚卸資産">&nbsp;&nbsp;&nbsp;&nbsp;棚卸資産</option>
                    <option value="建物">&nbsp;&nbsp;&nbsp;&nbsp;建物</option>
                    <option value="車両運搬具">&nbsp;&nbsp;&nbsp;&nbsp;車両運搬具</option>
                    <option value="工具・器具・備品">&nbsp;&nbsp;&nbsp;&nbsp;工具・器具・備品</option>
                    <option value="土地">&nbsp;&nbsp;&nbsp;&nbsp;土地</option>
                    <option value="事業主貸">&nbsp;&nbsp;&nbsp;&nbsp;事業主貸</option>
                    <option disabled>負債</option>
                    <option value="買掛金">&nbsp;&nbsp;&nbsp;&nbsp;買掛金</option>
                    <option value="借入金">&nbsp;&nbsp;&nbsp;&nbsp;借入金</option>
                    <option value="未払金">&nbsp;&nbsp;&nbsp;&nbsp;未払金</option>
                    <option value="前受金">&nbsp;&nbsp;&nbsp;&nbsp;前受金</option>
                    <option value="事業主借">&nbsp;&nbsp;&nbsp;&nbsp;事業主借</option>
                    <option disabled>資本</option>
                    <option value="元入金">&nbsp;&nbsp;&nbsp;&nbsp;元入金</option>
                    <option value="貸倒引当金">&nbsp;&nbsp;&nbsp;&nbsp;貸倒引当金</option>
                    <option disabled>費用</option>
                    <option value="租税公課">&nbsp;&nbsp;&nbsp;&nbsp;租税公課</option>
                    <option value="荷造運賃">&nbsp;&nbsp;&nbsp;&nbsp;荷造運賃</option>
                    <option value="水道光熱費">&nbsp;&nbsp;&nbsp;&nbsp;水道光熱費</option>
                    <option value="旅費交通費">&nbsp;&nbsp;&nbsp;&nbsp;旅費交通費</option>
                    <option value="通信費">&nbsp;&nbsp;&nbsp;&nbsp;通信費</option>
                    <option value="広告宣伝費">&nbsp;&nbsp;&nbsp;&nbsp;広告宣伝費</option>
                    <option value="接待交際費">&nbsp;&nbsp;&nbsp;&nbsp;接待交際費</option>
                    <option value="損害保険料">&nbsp;&nbsp;&nbsp;&nbsp;損害保険料</option>
                    <option value="修繕費">&nbsp;&nbsp;&nbsp;&nbsp;修繕費</option>
                    <option value="消耗品費">&nbsp;&nbsp;&nbsp;&nbsp;消耗品費</option>
                    <option value="減価償却費">&nbsp;&nbsp;&nbsp;&nbsp;減価償却費</option>
                    <option value="福利厚生費">&nbsp;&nbsp;&nbsp;&nbsp;福利厚生費</option>
                    <option value="給料賃金">&nbsp;&nbsp;&nbsp;&nbsp;給料賃金</option>
                    <option value="外注工賃">&nbsp;&nbsp;&nbsp;&nbsp;外注工賃</option>
                    <option value="利子割引料">&nbsp;&nbsp;&nbsp;&nbsp;利子割引料</option>
                    <option value="地代家賃">&nbsp;&nbsp;&nbsp;&nbsp;地代家賃</option>
                    <option value="貸倒金">&nbsp;&nbsp;&nbsp;&nbsp;貸倒金</option>
                    <option value="新聞図書費">&nbsp;&nbsp;&nbsp;&nbsp;新聞図書費</option>
                    <option value="車両関係費">&nbsp;&nbsp;&nbsp;&nbsp;車両関係費</option>
                    <option value="支払手数料">&nbsp;&nbsp;&nbsp;&nbsp;支払手数料</option>
                    <option value="打合会議費">&nbsp;&nbsp;&nbsp;&nbsp;打合会議費</option>
                    <option value="取材費">&nbsp;&nbsp;&nbsp;&nbsp;取材費</option>
                    <option value="諸会費">&nbsp;&nbsp;&nbsp;&nbsp;諸会費</option>
                    <option value="雑費">&nbsp;&nbsp;&nbsp;&nbsp;雑費</option>
                  </Select>
                  <Input
                    type='number'
                    placeholder="金額"
                    color='#65748A'
                    borderColor='#AAE2CF'
                    value={afterPrice}
                    onChange={e => changePrice(e)}
                  />
                </Flex>
                <Flex justifyContent='space-between'>
                  <Flex align='center'>
                    <SubText>
                      税率
                    </SubText>
                    <Button onClick={classToggle} className={active ? "tax" : ""} disabled={tax === '10%' ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={tax === '10%' ? '#3AA796' : '#fff'} color={tax === '10%' ? '#fff' : '#3AA796'} border={tax === '10%' ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                    <Button onClick={classToggle} className={active ? "" : "tax"} disabled={tax === '0%' ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={tax === '0%' ? '#3AA796' : '#fff'} color={tax === '0%' ? '#fff' : '#3AA796'} border={tax === '0%' ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                  </Flex>
                  <Box>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        税率
                      </SubText>
                      <Text>¥
                        {tax === '10%'
                          ? Math.floor(pr2 * 0.1).toLocaleString()
                          : 0
                        }
                      </Text>
                    </Flex>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        合計
                      </SubText>
                      <Text>¥
                        {pr2}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>

              <Box>
                <SubText marginBottom='10px'>
                  借方
                </SubText>
                <Flex marginBottom='15px'>
                  <Select borderColor='#AAE2CF' marginRight='10px' color='#65748A' fontWeight={'bold'} placeholder="勘定科目" cursor='pointer' value={accountCredit}
                    onChange={e => setAccountCredit(e.target.value)}>
                    <option disabled>資産</option>
                    <option value="現金">&nbsp;&nbsp;&nbsp;&nbsp;現金</option>
                    <option value="預金">&nbsp;&nbsp;&nbsp;&nbsp;預金</option>
                    <option value="定期預金">&nbsp;&nbsp;&nbsp;&nbsp;定期預金</option>
                    <option value="売掛金">&nbsp;&nbsp;&nbsp;&nbsp;売掛金</option>
                    <option value="有価証券">&nbsp;&nbsp;&nbsp;&nbsp;有価証券</option>
                    <option value="棚卸資産">&nbsp;&nbsp;&nbsp;&nbsp;棚卸資産</option>
                    <option value="建物">&nbsp;&nbsp;&nbsp;&nbsp;建物</option>
                    <option value="車両運搬具">&nbsp;&nbsp;&nbsp;&nbsp;車両運搬具</option>
                    <option value="工具・器具・備品">&nbsp;&nbsp;&nbsp;&nbsp;工具・器具・備品</option>
                    <option value="土地">&nbsp;&nbsp;&nbsp;&nbsp;土地</option>
                    <option value="事業主貸">&nbsp;&nbsp;&nbsp;&nbsp;事業主貸</option>
                    <option disabled>負債</option>
                    <option value="買掛金">&nbsp;&nbsp;&nbsp;&nbsp;買掛金</option>
                    <option value="借入金">&nbsp;&nbsp;&nbsp;&nbsp;借入金</option>
                    <option value="未払金">&nbsp;&nbsp;&nbsp;&nbsp;未払金</option>
                    <option value="前受金">&nbsp;&nbsp;&nbsp;&nbsp;前受金</option>
                    <option value="事業主借">&nbsp;&nbsp;&nbsp;&nbsp;事業主借</option>
                    <option disabled>資本</option>
                    <option value="元入金">&nbsp;&nbsp;&nbsp;&nbsp;元入金</option>
                    <option value="貸倒引当金">&nbsp;&nbsp;&nbsp;&nbsp;貸倒引当金</option>
                    <option disabled>費用</option>
                    <option value="租税公課">&nbsp;&nbsp;&nbsp;&nbsp;租税公課</option>
                    <option value="荷造運賃">&nbsp;&nbsp;&nbsp;&nbsp;荷造運賃</option>
                    <option value="水道光熱費">&nbsp;&nbsp;&nbsp;&nbsp;水道光熱費</option>
                    <option value="旅費交通費">&nbsp;&nbsp;&nbsp;&nbsp;旅費交通費</option>
                    <option value="通信費">&nbsp;&nbsp;&nbsp;&nbsp;通信費</option>
                    <option value="広告宣伝費">&nbsp;&nbsp;&nbsp;&nbsp;広告宣伝費</option>
                    <option value="接待交際費">&nbsp;&nbsp;&nbsp;&nbsp;接待交際費</option>
                    <option value="損害保険料">&nbsp;&nbsp;&nbsp;&nbsp;損害保険料</option>
                    <option value="修繕費">&nbsp;&nbsp;&nbsp;&nbsp;修繕費</option>
                    <option value="消耗品費">&nbsp;&nbsp;&nbsp;&nbsp;消耗品費</option>
                    <option value="減価償却費">&nbsp;&nbsp;&nbsp;&nbsp;減価償却費</option>
                    <option value="福利厚生費">&nbsp;&nbsp;&nbsp;&nbsp;福利厚生費</option>
                    <option value="給料賃金">&nbsp;&nbsp;&nbsp;&nbsp;給料賃金</option>
                    <option value="外注工賃">&nbsp;&nbsp;&nbsp;&nbsp;外注工賃</option>
                    <option value="利子割引料">&nbsp;&nbsp;&nbsp;&nbsp;利子割引料</option>
                    <option value="地代家賃">&nbsp;&nbsp;&nbsp;&nbsp;地代家賃</option>
                    <option value="貸倒金">&nbsp;&nbsp;&nbsp;&nbsp;貸倒金</option>
                    <option value="新聞図書費">&nbsp;&nbsp;&nbsp;&nbsp;新聞図書費</option>
                    <option value="車両関係費">&nbsp;&nbsp;&nbsp;&nbsp;車両関係費</option>
                    <option value="支払手数料">&nbsp;&nbsp;&nbsp;&nbsp;支払手数料</option>
                    <option value="打合会議費">&nbsp;&nbsp;&nbsp;&nbsp;打合会議費</option>
                    <option value="取材費">&nbsp;&nbsp;&nbsp;&nbsp;取材費</option>
                    <option value="諸会費">&nbsp;&nbsp;&nbsp;&nbsp;諸会費</option>
                    <option value="雑費">&nbsp;&nbsp;&nbsp;&nbsp;雑費</option>
                  </Select>
                  <Input
                    type='number'
                    placeholder="金額"
                    color='#65748A'
                    borderColor='#AAE2CF'
                    value={afterPrice}
                    onChange={e => changePrice(e)}
                  />
                </Flex>
                <Flex justifyContent='space-between'>
                  <Flex align='center'>
                    <SubText>
                      税率
                    </SubText>
                    <Button onClick={classToggle} className={active ? "tax" : ""} disabled={tax === '10%' ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={tax === '10%' ? '#3AA796' : '#fff'} color={tax === '10%' ? '#fff' : '#3AA796'} border={tax === '10%' ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                    <Button onClick={classToggle} className={active ? "" : "tax"} disabled={tax === '0%' ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={tax === '0%' ? '#3AA796' : '#fff'} color={tax === '0%' ? '#fff' : '#3AA796'} border={tax === '0%' ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                  </Flex>
                  <Box>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        税率
                      </SubText>
                      <Text>¥
                        {tax === '10%'
                          ? Math.floor(pr2 * 0.1).toLocaleString()
                          : 0
                        }
                      </Text>
                    </Flex>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        合計
                      </SubText>
                      <Text>¥
                        {pr2}
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
              // value={file}
              // onChange={e => setFile(e.target.value)}
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
                <Image src={file} alt="" display='block' w='48%' h='auto' marginLeft='auto' objectFit='cover' />
              </Flex>
            </Box>


            <Box marginBottom='30px'>
              <SubText marginBottom='10px'>
                取引先
              </SubText>
              <Textarea
                borderColor='#AAE2CF'
                placeholder="例：取引の相手先や販売数量など"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </Box>

            <Box textAlign='right'>
              <Buttonsecondary onClick={() => router.back()}>キャンセル</Buttonsecondary>
              <ButtonPrimary marginRight="12px" onClick={() => onClickDelete(router.query.id)}>削除</ButtonPrimary>
              <ButtonPrimary onClick={() => onClickAdd()}>登録</ButtonPrimary>
            </Box>

          </ContainerBox>
        </Box >
      </Layout >
    </>
  );
};


export default Id