import { NextPage } from "next/types";
import { ChangeEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, Input, Stack, Button, InputGroup, InputRightElement, Image } from '@chakra-ui/react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { app } from '../src/firebase';
import { LayoutAuth } from "../src/components/LayoutAuth";

const Signup: NextPage = () => {

  //ユーザー登録情報State
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState<any>("");
  // const [image, setImage] = useState()

  //認証用
  const auth = getAuth();

  //ストレージ(画像用)
  const storage = getStorage();

  //ルーティング
  const router = useRouter();

  //パスワード表示、非表示
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);


  //入力値
  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const handleChangePhotoURL = (e: { target: { files: SetStateAction<string>[]; }; }) => {
    setPhotoURL(e.target.files[0]);
  }


  //アカウント作成イベント
  const handleSubmit = () => {
    const authUser = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //サインイン後の処理
        let url: any = "";
        const user = userCredential.user;

        if (photoURL) {
          const S =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          const N = 16;
          const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
            .map((n) => S[n % S.length])
            .join("");
          const fileName = randomChar + "_" + photoURL.name;

          const storage = getStorage();
          const mountainsRef = ref(storage, `avatars/${fileName}`);
          uploadBytes(mountainsRef, photoURL).then(() => {
            // console.log('Uploaded a blob or file!');
          });


          url = getDownloadURL(ref(storage, `avatars/${fileName}`));

        }

        updateProfile(auth.currentUser as any, {
          displayName: displayName,
          photoURL: url
        })
        router.push("/mypage")
      })
    setDisplayName("");
    setEmail("");
    setPassword("");
  }

  //ページリロード時にログイン状態を監視、リダイレクト
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        router.push("/mypage")
      }
    });
  }, []);



  return (
    <>
      <LayoutAuth>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Box>
            <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>新規登録</h1>
            <Box p='60px' bg='White'>
              <Stack marginBottom='45px' spacing='20px'>
                <Box>
                  {/* <Box ref={fileName}></Box> */}
                  {/* <Image src={photoURL} alt="" display='block' w='85px' h='auto' marginBottom='25px' /> */}
                  <Input
                    type='file'
                    accept="image/*"
                    onChange={handleChangePhotoURL}
                  />
                </Box>
                <Input
                  type='text'
                  placeholder='ユーザー名'
                  value={displayName}
                  onChange={handleChangeDisplayName}
                  w='330px'
                  borderColor='#AAE2CF' />
                <Input
                  type='email'
                  placeholder='メールアドレス'
                  value={email}
                  onChange={handleChangeEmail}
                  w='330px'
                  borderColor='#AAE2CF' />
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='パスワード'
                    value={password}
                    onChange={handleChangePassword}
                    borderColor='#AAE2CF'
                  />
                  <InputRightElement width='4.5rem'>
                    <Box onClick={handleClick} cursor='pointer'>
                      {show
                        ? <Image src="/viewicon-open.svg" w='1em' h='1em' />
                        : <Image src="/viewicon-close.svg" w='1em' h='1em' />
                      }
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Button backgroundColor='#3AA796' color='white' w='100%' marginBottom='35px' onClick={handleSubmit}>登録</Button>
              <Stack textAlign='center' fontSize='14px' color='#64A2D7'>
                <Link href={'/login'}>アカウントをお持ちの方</Link>
              </Stack>
            </Box>
          </Box>
        </Box>
      </LayoutAuth>
    </>
  )
}
export default Signup;