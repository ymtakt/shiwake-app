import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, Text, Flex, Select, Input, Textarea, Button, Image } from '@chakra-ui/react'
import { collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Layout } from '../../src/components/Layout'
import { ContainerBox } from "../../src/components/ContainerBox";
import { HeadSecond } from "../../src/components/HeadSecond";

import { SubText } from "../../src/components/SubText";
import { Buttonsecondary } from "../../src/components/Buttonsecondary";
import { ButtonPrimary } from "../../src/components/ButtonPrimary";
import { useAuth } from "../../src/atom";
import { app, db, storage } from "../../src/firebase";
import { RegisterForm } from "../../src/components/RegisterForm";
import { accountName } from "../../src/util";


const Id = () => {
  //Recoilのログイン状態
  const user = useAuth();
  //ルーティング
  const router = useRouter();

  const [accountDebit, setAccountDebit] = useState(router.query.accountDebit);
  const [accountCredit, setAccountCredit] = useState(router.query.accountCredit);
  const [type, setType] = useState(router.query.type);
  const [price, setPrice] = useState(router.query.price);
  const [note, setNote] = useState(router.query.note);

  const datea = router.query.date
  const [date, setDate] = useState(datea);

  const [file, setFile] = useState(router.query.file);
  const [client, setClient] = useState(router.query.client);

  const [pl, setPl] = useState(router.query.pl);
  const [payment, setPayment] = useState(router.query.payment);

  const [calcTaxDebit, setCalcTaxDebit] = useState<any>(router.query.priceTaxDebit);
  const [calcTaxCredit, setCalcTaxCredit] = useState<any>(router.query.priceTaxCredit);

  const [photoURL, setPhotoURL] = useState<any>(router.query.file);

  const inputRef = useRef<HTMLInputElement>(null);
  const booleanDebit = router.query.activeDebit

  const booleanCredit = router.query.activeCredit

  const booDebit = booleanDebit === "true" ? true : false
  const booCredit = booleanCredit === "true" ? true : false

  const [activeDebit, setActiveDebit] = useState(booDebit);
  const [activeCredit, setActiveCredit] = useState(booCredit);

  const [taxDebit, setTaxDebit] = useState(router.query.taxDebit)
  const [taxCredit, setTaxCredit] = useState(router.query.taxCredit)

  const classToggleDebit = () => {
    setActiveDebit(!activeDebit)
    if (activeDebit === true) {
      setTaxDebit('0%')
      setCalcTaxDebit(Number(0))
    } else {
      setTaxDebit('10%')
      setCalcTaxDebit(Math.floor(Number(price) * 0.1))
    }
  }

  const classToggleCredit = () => {
    setActiveCredit(!activeCredit)
    if (activeCredit === true) {
      setTaxCredit('0%')
      setCalcTaxCredit(Number(0))
    } else {
      setTaxCredit('10%')
      setCalcTaxCredit(Math.floor(Number(price) * 0.1))
    }
  }


  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
    if (activeDebit === true) {
      setCalcTaxDebit(Math.floor(Number(e.target.value) * 0.1))
    } else {
      setCalcTaxDebit(Number(0))
    }

    if (activeCredit === true) {
      setCalcTaxCredit(Math.floor(Number(e.target.value) * 0.1))
    } else {
      setCalcTaxCredit(Number(0))
    }
  }
  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateb = new Date(e.target.value);
    setDate(dateb.toLocaleString())
  }


  const handleChangePhotoURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      if (user) {
        const fileObject = e.target.files[0];
        setFile(window.URL.createObjectURL(fileObject));

        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomChar + "_" + fileObject.name;

        console.log(user.uid)

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
  }
  const onDeleteClick = () => {
    setPhotoURL(null)
    setFile("")
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

    setDoc(doc(usersRef, id), {
      uid: user?.uid,
      accountDebit,
      accountCredit,
      type,
      price: Number(price),
      priceDebit: Number(price),
      priceCredit: Number(price),
      priceTaxDebit: calcTaxDebit,
      priceTaxCredit: calcTaxCredit,
      date: new Date(date),
      timestamp: new Date(),
      year: new Date(date).getFullYear(),
      month: new Date(date).getMonth() + 1,
      yearAndMonth: `${new Date(date).getFullYear()}年${new Date(date).getMonth() + 1}月`,
      note,
      client,
      file: photoURL,
      taxDebit,
      taxCredit,
      activeDebit,
      activeCredit,
      pl,
      payment
    });

    router.push("/account");
    router.reload
  }


  const onButtonClick = () => {
    inputRef.current?.click();
  };


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
          <HeadSecond>仕訳編集</HeadSecond>
          <ContainerBox>
            <Flex marginBottom='30px' flexWrap={{ base: "wrap", md: "nowrap" }}>
              <Box w={{ base: "40%", md: "auto" }} marginRight='25px' marginBottom={{ base: "25px", md: "0" }}>
                <SubText marginBottom='10px'>
                  {accountName.date}
                </SubText>
                <Input
                  type='date'
                  color='#65748A'
                  borderColor='#AAE2CF'
                  defaultValue={date}
                  // value={newDate}
                  onChange={e => handleChangeDate(e)}
                />
              </Box>
              <Box w={{ base: "39%", md: "auto" }} marginRight='25px'>
                <SubText marginBottom='10px'>
                  {accountName.payments}
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
              <Box w={{ base: "100%", md: "auto" }} marginRight={{ base: "0", md: "25px" }} marginBottom={{ base: "25px", md: "0" }}>
                <SubText marginBottom='10px'>
                  {accountName.client}
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
              <Box w={{ base: "26%", md: "auto" }} marginRight='25px'>
                <SubText marginBottom='10px'>
                  {accountName.pl}
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
              <Box w={{ base: "20%", md: "auto" }} >
                <SubText marginBottom='10px'>
                  {accountName.settlement}
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

            <Flex justify='space-between' align='flex-start' flexWrap={{ base: "wrap", md: "nowrap" }} marginBottom='30px'>
              <Box w={{ base: "100%", md: "auto" }} marginRight={{ base: "0", md: "25px" }}>
                <SubText marginBottom='10px'>
                  {accountName.debit}
                </SubText>
                <Flex marginBottom='15px'>
                  <Select borderColor='#AAE2CF' marginRight='10px' color='#65748A' fontWeight={'bold'} placeholder="勘定科目" cursor='pointer' value={accountDebit}
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
                    <option value="元入金">&nbsp;&nbsp;&nbsp;&nbsp;売上</option>
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
                    <Button onClick={classToggleDebit} className={activeDebit ? "tax" : ""} disabled={taxDebit === '10%' ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={taxDebit === '10%' ? '#3AA796' : '#fff'} color={taxDebit === '10%' ? '#fff' : '#3AA796'} border={taxDebit === '10%' ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                    <Button onClick={classToggleDebit} className={activeDebit ? "" : "tax"} disabled={taxDebit === '0%' ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={taxDebit === '0%' ? '#3AA796' : '#fff'} color={taxDebit === '0%' ? '#fff' : '#3AA796'} border={taxDebit === '0%' ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                  </Flex>
                  <Box>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        税率
                      </SubText>
                      <Text>¥
                        {taxDebit === '10%'
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
                        {Number(price).toLocaleString()}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>

              <Box w={{ base: "100%", md: "auto" }}>
                <SubText marginBottom='10px'>
                  {accountName.credit}
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
                    <Button onClick={classToggleCredit} className={activeCredit ? "tax" : ""} disabled={activeCredit ? true : false} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={activeCredit ? '#3AA796' : '#fff'} color={activeCredit ? '#fff' : '#3AA796'} border={activeCredit ? 'none' : '1px solid #3AA796'} opacity='1 !important' fontSize='12px' textAlign='center'>10%</Button>
                    <Button onClick={classToggleCredit} className={activeCredit ? "" : "tax"} disabled={activeCredit ? false : true} display='inline-block' h='auto' p='8px 7px' marginLeft='5px' backgroundColor={activeCredit ? '#fff' : '#3AA796'} color={activeCredit ? '#3AA796' : '#fff'} border={activeCredit ? '1px solid #3AA796' : 'none'} opacity='1 !important' fontSize='12px' textAlign='center'>なし</Button>
                  </Flex>
                  <Box>
                    <Flex align='center' justifyContent='space-between'>
                      <SubText>
                        税率
                      </SubText>
                      <Text>¥
                        {taxCredit === '10%'
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
                        {Number(price).toLocaleString()}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Flex>

            <Box marginBottom='30px'>
              <SubText marginBottom='10px'>
                {accountName.image}
              </SubText>
              <Flex flexWrap={{ base: "wrap", md: "nowrap" }}>
                <Input
                  id="image"
                  ref={inputRef}
                  hidden
                  multiple
                  type="file"
                  accept="image/png,image/jpeg,image/gif/,application/pdf"
                  onChange={handleChangePhotoURL}
                />
                <Box marginBottom={{ base: "25px", md: "0" }}>
                  <Button
                    onClick={onButtonClick}
                    w='330px'
                    borderColor='#AAE2CF'
                  >
                    ファイルを選択
                  </Button>
                  {file &&
                    <Button
                      onClick={onDeleteClick}
                      w='250px'
                      borderColor='#AAE2CF'
                      display='block'
                      marginTop='35px'
                    >
                      削除
                    </Button>
                  }
                </Box>
                <Image w={{ base: "100%", md: "48%" }} src={file} alt="" display='block' h='auto' marginLeft='auto' objectFit='cover' />
              </Flex>
            </Box>

            <Box marginBottom='30px'>
              <SubText marginBottom='10px'>
                {accountName.remarks}
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