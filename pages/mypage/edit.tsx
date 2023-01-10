import { useEffect, useRef, useState } from "react";
import { NextPage } from "next/types";
import { Flex, Box, Image, Input, Button } from '@chakra-ui/react'
import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

import { Layout } from '../../src/components/Layout'
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";
import { Buttonsecondary } from "../../src/Parts/Buttonsecondary";
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { SubText } from "../../src/Parts/SubText";
import { auth, db, storage } from "../../src/firebase";
import { useRouter } from "next/router";
import { useAuth } from "../../src/atom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const Edit: NextPage = () => {

  const [displayName, setDisplayName] = useState('');
  const [src, setSrc] = useState('');
  const [photoURL, setPhotoURL] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  //Recoilのログイン状態
  const user = useAuth();
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
      // console.log('ok')
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
    }).finally(() => {
      router.push("/mypage")
    });
  }

  useEffect(() => {
    (async () => {
      if (user) {
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
              <Flex flexDirection={{ base: "column-reverse", md: "row" }} align='flex-start' justify='space-between' marginBottom='45px'>
                <Box>
                  {src ?
                    <Image src={src} alt="" display='block' w='85px' h='85px' borderRadius='50%' m='0 auto 25px' objectFit='cover' />
                    :
                    <Image src='/profire-default.svg' alt="" w='85px' h='85px' borderRadius='50%' objectFit='cover' />
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
                    w={{ base: "auto", md: '330px' }}
                    borderColor='#AAE2CF'
                  >
                    ファイルを選択
                  </Button>
                </Box>
                <Box w={{ base: "100%", md: '450px' }}>
                  <Box marginBottom='25px'>
                    <SubText marginBottom='10px'>
                      アカウント名
                    </SubText>
                    <Input
                      type='text'
                      w={{ base: "100%", md: '330px' }}
                      borderColor='#AAE2CF'
                      value={displayName}
                      onChange={handleChangeDisplayName}
                    />
                  </Box>
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
