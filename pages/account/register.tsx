import { NextPage } from "next/types";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box, Text, Flex, Select, Input, Textarea, Button, Image
} from '@chakra-ui/react'

import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Layout } from '../../src/components/Layout'
import { ContainerBox } from "../../src/components/ContainerBox";
import { HeadSecond } from "../../src/components/HeadSecond";
import { SubText } from "../../src/components/SubText";
import { Buttonsecondary } from "../../src/components/Buttonsecondary";
import { ButtonPrimary } from "../../src/components/ButtonPrimary";
import { db, storage } from "../../src/firebase";
import { useAuth, userState } from "../../src/atom";

import styles from '../../styles/Select.module.scss';
import { RegisterForm } from "../../src/components/RegisterForm";
import { useMount } from "../../src/hooks/useMount";
import { useRecoilState } from "recoil";

const Mypage: NextPage = () => {
  // Recoilのログイン状態
  const [user, setUser] = useRecoilState(userState)
  // const user = useAuth();
  //ルーティング
  const router = useRouter();

  const [accountDebit, setAccountDebit] = useState<string>("");
  const [accountCredit, setAccountCredit] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [pl, setPl] = useState<string>("true");
  const [payment, setPayment] = useState<string>("true");

  //計算後の金額を登録
  const [calcPriceDebit, setCalcPriceDebit] = useState<number>();
  const [calcPriceCredit, setCalcPriceCredit] = useState<number>();

  const [calcTaxDebit, setCalcTaxDebit] = useState<number>();
  const [calcTaxCredit, setCalcTaxCredit] = useState<number>();

  const [note, setNote] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [file, setFile] = useState<string>("");
  const [client, setClient] = useState<string>("");

  const [src, setSrc] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const [activeDebit, setActiveDebit] = useState<boolean>(true);
  const [taxDebit, setTaxDebit] = useState<string>('10%')

  const [activeCredit, setActiveCredit] = useState<boolean>(true);
  const [taxCredit, setTaxCredit] = useState<string>('10%')

  const [disable, setDisable] = useState<boolean>(true);


  const classToggleDebit = () => {
    setActiveDebit(!activeDebit)
    if (activeDebit === true) {
      setTaxDebit('0%')
    } else {
      setTaxDebit('10%')
    }
  }

  const classToggleCredit = () => {
    setActiveCredit(!activeCredit)
    if (activeCredit === true) {
      setTaxCredit('0%')
    } else {
      setTaxCredit('10%')
    }
  }

  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
    if (activeDebit === true) {
      setCalcTaxDebit(Math.floor(Number(e.target.value) * 0.1))
    } else {
      setCalcTaxDebit(0)
    }
    if (activeCredit === true) {
      setCalcTaxCredit(0)
    } else {
      setCalcTaxCredit(Math.floor(Number(e.target.value) * 0.1))
    }
  }

  const handleChangePhotoURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const fileObject = e.target.files[0];
      setPhotoURL(fileObject)
      setSrc(window.URL.createObjectURL(fileObject));
    }
  }

  const onDeleteClick = () => {
    setPhotoURL(null)
    setSrc("")
  }

  //登録
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
        uploadBytes(mountainsRef, photoURL).then((url) => {
          // console.log(url);
          getDownloadURL(mountainsRef).then(url => {
            setFile(url)

            addDoc(collection(db, "users", user.uid, "details"), {
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
              file: url,
              client,
              taxDebit,
              taxCredit,
              activeDebit,
              activeCredit,
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
          taxDebit,
          taxCredit,
          activeDebit,
          activeCredit,
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
    if (activeDebit === true) {
      setCalcPriceDebit(Math.floor(Number(calcPriceDebit) * 0.1 + Number(calcPriceDebit)))
    } else {
      const RATE = 0.1;
      //消費税計算（四捨五入）
      setCalcPriceDebit(Math.round(Number(calcPriceDebit) / (1 + RATE)));
    }

    if (activeCredit === true) {
      setCalcPriceCredit(Math.floor(Number(calcPriceCredit) * 0.1 + Number(calcPriceCredit)))
    } else {
      const RATE = 0.1;
      //消費税計算（四捨五入）
      setCalcPriceCredit(Math.round(Number(calcPriceCredit) / (1 + RATE)));
    }
  }, [activeDebit, activeCredit]);

  useEffect(() => {
    if (date !== "" && client !== "" && accountDebit !== "" && accountCredit !== "" && price !== "" && type === '収入' || type === '支出') {
      setDisable(false)
    } else {
      setDisable(true)
    }

  }, [date, type, client, accountDebit, accountCredit, price]);

  const { isMounted } = useMount();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Layout>
        <Box w='100%'>
          <HeadSecond>新しい仕訳を登録</HeadSecond>
          <ContainerBox>
            <RegisterForm date={date} setDate={setDate} type={type} setType={setType} client={client} setClient={setClient}
              pl={pl} setPl={setPl} payment={payment} setPayment={setPayment} accountDebit={accountDebit} activeCredit={activeCredit} setAccountDebit={setAccountDebit} price={price} changePrice={changePrice}
              activeDebit={activeDebit} classToggleDebit={classToggleDebit} accountCredit={accountCredit} setAccountCredit={setAccountCredit} classToggleCredit={classToggleCredit}
              inputRef={inputRef} handleChangePhotoURL={handleChangePhotoURL} onButtonClick={onButtonClick} onDeleteClick={onDeleteClick}
              src={src} note={note} setNote={setNote} />

            <Box textAlign='right'>
              <Link href={'/account'}>
                <Buttonsecondary>キャンセル</Buttonsecondary>
              </Link>
              {/* disable */}
              <ButtonPrimary disabled={disable} onClick={onClick}>登録</ButtonPrimary>
            </Box>
          </ContainerBox>
        </Box>
      </Layout>
    </>
  )
}
export default Mypage;