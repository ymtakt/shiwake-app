import { useEffect, useRef, useState } from "react";
import { NextPage } from "next/types";
import Link from "next/link";
import { Flex, Box, Image, Text, Input, Button } from '@chakra-ui/react'
import { getAuth, onAuthStateChanged, updateEmail, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";

import { Layout } from '../../src/components/Layout'
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";
import { Buttonsecondary } from "../../src/Parts/Buttonsecondary";
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { SubText } from "../../src/Parts/SubText";
import { app } from "../../src/firebase";
import { useRouter } from "next/router";
import { useAuth, userState } from "../../src/atom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";




const Edit: NextPage = () => {

  const [displayName, setDisplayName] = useState('');
  const [src, setSrc] = useState('');
  const [photoURL, setPhotoURL] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  //Recoilのログイン状態
  const auth = getAuth(app);
  // const userA = auth.currentUser as any;

  //データベース接続
  const db = getFirestore(app);

  //Recoilのログイン状態
  const user = useAuth();

  //ストレージ(画像用)
  const storage = getStorage();

  //ルーティング
  const router = useRouter();


  //入力値
  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  }
  const handleChangePhotoURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const fileObject = e.target.files[0];
      setPhotoURL(fileObject)
      setSrc(window.URL.createObjectURL(fileObject));
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click();
  };
  const handleEdit = () => {



    updateProfile(auth.currentUser as any, {
      displayName: displayName,
    }).then(() => {
      console.log('ok')

      const uid = user.uid

      if (photoURL) {
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomChar + "_" + photoURL.name;

        const mountainsRef = ref(storage, `avatars/${fileName}`);
        uploadBytes(mountainsRef, photoURL).then((url) => {
          console.log(url);
          getDownloadURL(mountainsRef).then(url => {
            setDoc(doc(db, "users", uid), {
              uid: user?.uid,
              displayName: displayName,
              name: 'user',
              photoURL: url,
            });
          })
        });
      }
    }).catch((error) => {
      console.log(error)
    });

    setDisplayName("");
    setPhotoURL(null);
    router.push("/mypage")
  }

  useEffect(() => {
    (async () => {
      if (user) {
        //ユーザー読み込み
        // await onSnapshot(doc(db, "users", user.uid), (doc) => {
        //   setUserData(doc.data())
        // });
        //ユーザーデータ読み込み
        const usersCollectionRef = await collection(db, 'users', user.uid, 'details');

        //ユーザーのphotoURLを取得
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSrc(docSnap.data().photoURL);
          setPhotoURL(docSnap.data().photoURLL)
        } else {
          console.log("No such document!");
        }

        setDisplayName(user.displayName)
      }

    })()
  }, [user]);

  return (
    <>
      <Layout>
        <Box >
          <Box marginBottom='45px'>
            <HeadSecond>アカウント編集</HeadSecond>
            <ContainerBox>
              <Flex align='flex-start' justify='space-between' marginBottom='45px'>
                <Box>
                  {/* <Image src={photoURL} alt="" display='block' w='85px' h='85px' borderRadius='50%' m='0 auto 25px' objectFit='cover' /> */}
                  {user !== null &&
                    <Image src={src} alt="" display='block' w='85px' h='85px' borderRadius='50%' m='0 auto 25px' objectFit='cover' />
                  }
                  <Input
                    id="image"
                    ref={inputRef}
                    hidden
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={handleChangePhotoURL}
                  />
                  <Button
                    onClick={onButtonClick}
                    w='330px'
                    borderColor='#AAE2CF'
                  >
                    ファイルを選択
                  </Button>
                </Box>
                <Box w='450px'>
                  <Box marginBottom='25px'>
                    <SubText marginBottom='10px'>
                      アカウント名
                    </SubText>
                    <Input
                      type='text'
                      w='330px'
                      borderColor='#AAE2CF'
                      value={displayName}
                      onChange={handleChangeDisplayName}
                    />
                  </Box>
                  {/* <Box>
                    <SubText marginBottom='10px'>
                      メールアドレス
                    </SubText>
                    <Input
                      type='email'
                      value='hoge@hoge.com'
                      w='330px'
                      borderColor='#AAE2CF'
                      value={email}
                      onChange={handleChangeEmail}
                    />
                  </Box> */}
                </Box>
              </Flex>
              <Box textAlign='right'>
                <Buttonsecondary onClick={() => router.back()}>キャンセル</Buttonsecondary>
                <ButtonPrimary onClick={handleEdit}>登録する</ButtonPrimary>
              </Box>
            </ContainerBox>
          </Box>
        </Box>
      </Layout>
    </>
  )
}
export default Edit;
