import { NextPage } from "next/types";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, Input, Stack, Button, InputGroup, InputRightElement, Image } from '@chakra-ui/react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { app } from '../src/firebase';
import { LayoutAuth } from "../src/components/LayoutAuth";


const Signup: NextPage = () => {


  //ユーザー登録情報State
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [src, setSrc] = useState('profire-default.svg');
  const [photoURL, setPhotoURL] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  //認証用
  const auth = getAuth();

  //ストレージ(画像用)
  const storage = getStorage();

  //ルーティング
  const router = useRouter();

  //パスワード表示、非表示
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //データベース接続
  const db = getFirestore(app);


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
  const handleChangePhotoURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const fileObject = e.target.files[0];
      setPhotoURL(fileObject)
      setSrc(window.URL.createObjectURL(fileObject));
      // console.log(e.target.files[0].name)
    }
    // setPhotoURL(e.target.files[0].name);
  }

  const onButtonClick = () => {
    inputRef.current?.click();
  };


  //アカウント作成イベント
  const handleSubmit = () => {
    const authUser = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //サインイン後の処理
        // let url: any = "";
        const user = userCredential.user;
        updateProfile(auth.currentUser as any, {
          displayName: displayName,
        })

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
                displayName: displayName,
                name: 'user',
                photoURL: url,
                uid
              });
            })
          });
        } else {
          setDoc(doc(db, "users", uid), {
            displayName: displayName,
            name: 'user',
            photoURL: null,
            uid
          });
        }

      })

    setDisplayName("");
    setEmail("");
    setPassword("");

    router.push("/mypage")
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
        <Box w={{ base: "100%", md: "auto" }} display='flex' justifyContent='center' alignItems='center'>
          <Box w={{ base: "100%", md: "auto" }} >
            <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>新規登録</h1>
            <Box p={{ base: "25px", md: "60px" }} bg='White'>
              <Stack marginBottom='45px' spacing='20px'>
                <Box>
                  {/* <Box ref={fileName}></Box> */}
                  <Image src={src} alt="" display='block' w='85px' h='85px' borderRadius='50%' m='0 auto 25px' objectFit='cover' />
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
                    w={{ base: "100%", md: "330px" }}
                    borderColor='#AAE2CF'
                  >
                    ファイルを選択
                  </Button>
                </Box>
                <Input
                  type='text'
                  placeholder='ユーザー名'
                  value={displayName}
                  onChange={handleChangeDisplayName}
                  w={{ base: "100%", md: "330px" }}
                  borderColor='#AAE2CF' />
                <Input
                  type='email'
                  placeholder='メールアドレス'
                  value={email}
                  onChange={handleChangeEmail}
                  w={{ base: "100%", md: "330px" }}
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