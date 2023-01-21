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
import { useAuth, userState } from "../../src/atom";
import { db, storage } from "../../src/firebase";
import { accountName } from "../../src/util";
import { AccountSelectOptions } from "../../src/components/AccountSelectOptions";
import { useRecoilState } from "recoil";
import { useMount } from "../../src/hooks/useMount";


const Id = () => {

  // Recoilのログイン状態
  const [user, setUser] = useRecoilState(userState)
  // const user = useAuth();
  //ルーティング
  const router = useRouter();

  const [accountDebit, setAccountDebit] = useState<string | string[] | undefined>(router.query.accountDebit);
  const [accountCredit, setAccountCredit] = useState<string | string[] | undefined>(router.query.accountCredit);
  const [type, setType] = useState<string | string[] | undefined>(router.query.type);
  const [price, setPrice] = useState<string | string[] | undefined>(router.query.price);
  const [note, setNote] = useState<string | string[] | undefined>(router.query.note);

  const datea: string | string[] | undefined = router.query.date
  const [date, setDate] = useState<any>(datea);

  const [file, setFile] = useState<any>(router.query.file);
  const [client, setClient] = useState<string | string[] | undefined>(router.query.client);

  const [pl, setPl] = useState<string | string[] | undefined>(router.query.pl);
  const [payment, setPayment] = useState<string | string[] | undefined>(router.query.payment);

  const [calcTaxDebit, setCalcTaxDebit] = useState<any>(router.query.priceTaxDebit);
  const [calcTaxCredit, setCalcTaxCredit] = useState<any>(router.query.priceTaxCredit);

  const [photoURL, setPhotoURL] = useState<any>(router.query.file);

  const inputRef = useRef<HTMLInputElement>(null);
  const booleanDebit: string | string[] | undefined = router.query.activeDebit

  const booleanCredit: string | string[] | undefined = router.query.activeCredit

  const booDebit: boolean = booleanDebit === "true" ? true : false
  const booCredit: boolean = booleanCredit === "true" ? true : false

  const [activeDebit, setActiveDebit] = useState<boolean>(booDebit);
  const [activeCredit, setActiveCredit] = useState<boolean>(booCredit);

  const [taxDebit, setTaxDebit] = useState<string | string[] | undefined>(router.query.taxDebit)
  const [taxCredit, setTaxCredit] = useState<string | string[] | undefined>(router.query.taxCredit)

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

  const onClickDelete = async (id: string | string[] | undefined) => {
    if (user) {
      // await deleteDoc(doc(db, "users", user.uid, "details", id));
      const usersRef = collection(db, "users", user.uid, "details")
      const id = router.query.id as string
      await deleteDoc(doc(usersRef, id));
      router.push("/account")
    }
  }

  const onClickAdd = () => {
    if (user) {
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
    }
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


  const { isMounted } = useMount();

  if (!isMounted) {
    return null;
  }


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
                    <AccountSelectOptions />
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
                    <AccountSelectOptions />
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