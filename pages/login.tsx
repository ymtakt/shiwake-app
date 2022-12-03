import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Input, Stack, Button, InputGroup, InputRightElement, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useSetRecoilState } from "recoil";

import { LayoutAuth } from "../src/components/LayoutAuth";
import { app } from "../src/firebase";
import { useRouter } from "next/router";
import { Buttonsecondary } from "../src/Parts/Buttonsecondary";
import { ButtonPrimary } from "../src/Parts/ButtonPrimary";




const Login: NextPage = () => {

  //メールアドレス、パスワード状態管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  // const auth = getAuth(app);
  const auth = getAuth();
  const user = auth.currentUser;


  //ルーティング
  const router = useRouter();

  //パスワードリセット、モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();

  //パスワード表示、非表示
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)



  //入力値
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  //ログインイベント
  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //サインイン後の処理
        const user = userCredential.user;
        //...
        console.log("ログイン完了")
        router.push("/mypage")
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    setEmail("");
    setPassword("");
  }

  //パスワードリセットイベント
  const handleResetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('メールを送信しました')
        router.push("/login")
        onClose();
      })
      .catch((err => {
        console.log(err)
      }))
    setEmail("");
  }

  //ページリロード時にログイン状態を監視、リダイレクト
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        router.push("/mypage")
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);


  return (
    <LayoutAuth>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Box>
          <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>ログイン</h1>
          <Box p='60px' bg='White'>
            <Stack marginBottom='45px' spacing='20px'>
              <Input
                type='email'
                placeholder='メールアドレス'
                w='330px'
                borderColor='#AAE2CF'
                value={email}
                onChange={handleChangeEmail}
              />

              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='パスワード'
                  borderColor='#AAE2CF'
                  value={password}
                  onChange={handleChangePassword}
                />
                <InputRightElement width='4.5rem'>
                  <Box onClick={handleClick} cursor='pointer'>
                    {show
                      ? <Image src="/viewicon-open.svg" alt="" w='1em' h='1em' />
                      : <Image src="/viewicon-close.svg" alt="" w='1em' h='1em' />
                    }
                  </Box>
                </InputRightElement>
              </InputGroup>

            </Stack>
            <Button backgroundColor='#3AA796' color='white' w='100%' marginBottom='35px' onClick={handleSubmit}>ログイン</Button>
            <Stack textAlign='center' fontSize='14px' color='#64A2D7'>
              <Link href={'/signup'}>アカウントをお持ちでない方</Link>
              <Button textAlign='center' fontWeight='normal' fontSize='14px' color='#64A2D7' background='transparent' onClick={onOpen}>パスワードを忘れた方</Button>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>パスワード再設定</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    type='email'
                    placeholder='メールアドレス'
                    w='330px'
                    borderColor='#AAE2CF'
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </ModalBody>

                <ModalFooter>
                  <Buttonsecondary>キャンセル</Buttonsecondary>
                  <ButtonPrimary onClick={() => handleResetPassword(email)}>パスワード再設定メールを送る</ButtonPrimary>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Box>
    </LayoutAuth >
  )
}
export default Login;