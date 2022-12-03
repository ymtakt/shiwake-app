import { useState } from "react";
import { NextPage } from "next/types";
import Link from "next/link";
import { Flex, Box, Image, Text, Input } from '@chakra-ui/react'
import { getAuth, updateProfile } from "firebase/auth";

import { Layout } from '../../src/components/Layout'
import { ButtonPrimary } from "../../src/Parts/ButtonPrimary";
import { Buttonsecondary } from "../../src/Parts/Buttonsecondary";
import { ContainerBox } from "../../src/Parts/ContainerBox";
import { HeadSecond } from "../../src/Parts/HeadSecond";
import { SubText } from "../../src/Parts/SubText";
import { app } from "../../src/firebase";
import { useRouter } from "next/router";



const Edit: NextPage = () => {

  const auth = getAuth(app);
  const user = auth.currentUser as any;
  console.log(auth);

  // const user = useAuth();

  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [photoURL, setPhotoURL] = useState("");

  //ルーティング
  const router = useRouter();

  //入力値
  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleChangePhotoURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoURL(e.target.value);
  }


  const handleEdit = () => {
    updateProfile(auth.currentUser as any, {
      displayName: displayName,
      // email: email,
      photoURL: photoURL
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });

    router.push("/mypage")

    setDisplayName("");
    setEmail("");
    setPhotoURL("");
  }

  return (
    <>
      <Layout>
        <Box >
          <Box marginBottom='45px'>
            <HeadSecond>アカウント編集</HeadSecond>
            <ContainerBox>
              <Flex align='flex-start' justify='space-between' marginBottom='45px'>
                <Box>
                  <Image src={user.photoURL} alt="" display='block' w='85px' h='auto' marginBottom='25px' />
                  <Input
                    type='file'
                    // value='ファイルを選択'
                    // borderColor='#AAE2CF'
                    value={photoURL}
                    onChange={handleChangePhotoURL}
                  />
                </Box>
                <Box w='450px'>
                  <Box marginBottom='25px'>
                    <SubText marginBottom='10px'>
                      アカウント名
                    </SubText>
                    <Input
                      type='text'
                      value='ホゲホゲ　太郎'
                      w='330px'
                      borderColor='#AAE2CF'
                      value={displayName}
                      onChange={handleChangeDisplayName}
                    />
                  </Box>
                  <Box>
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
                  </Box>
                </Box>
              </Flex>
              <Box textAlign='right'>
                <Link href={'/mypage'}>
                  <Buttonsecondary>キャンセル</Buttonsecondary>
                </Link>
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
