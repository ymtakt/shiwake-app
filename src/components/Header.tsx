import Link from 'next/link'
import { Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, IconButton, Image, ListItem, Stack, Text, UnorderedList, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'next/router';

import styles from '../../styles/Header.module.scss'
import { app } from '../firebase';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useAuth, userState } from '../atom';


type Props = {
  className?: string
}


export const Header = (props: Props) => {

  const auth = getAuth(app);
  const router = useRouter();

  const user = useAuth();


  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleClick = (() => {
    signOut(auth).then(() => {
      console.log('ログアウトしました')
      router.push("/login");
    }).catch((err) => {
      console.log(err);
    })
  })

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     // ...
  //     // const displayName = user.displayName;
  //     console.log(user);
  //     setUser(user);
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });


  return (
    <header className={styles.header + (props.className ? ` ${props.className}` : "")} >
      <Flex justify='space-between' align='center'>
        <Link href={'/'}>
          <Image src="/logo-wh.png" alt="shiwake" width='85px' height='auto' />
        </Link>
        {/* <Flex> */}
        <Flex>
          {user !== null &&
            <Flex align='center' onClick={handleClick} cursor='pointer'>
              <Image src="/logout.svg" alt="shiwake" width='21px' height='auto' />
              <Text color='#fff' fontSize='14px' fontWeight='600' ml='4px' >ログアウト</Text>
            </Flex>
          }
          <Box display={{ base: "block", md: "none" }} marginLeft='15px' >
            <IconButton aria-label="メニューボタン"
              icon={<HamburgerIcon color="#fff" size="md" />}
              size="md" variant="unstyled"
              display={{ base: "block", md: "none" }}
              onClick={onOpen}
              cursor='pointer'
            />

            <Drawer isOpen={isOpen} onClose={onClose} placement="left">
              <DrawerOverlay>
                <DrawerBody>
                  <DrawerContent position='relative' p={0} backgroundColor='#3D4A4F'>
                    <CloseIcon color='#fff' position='absolute' top='15px' right='-45px' cursor='pointer' onClick={onClose} />
                    <UnorderedList listStyleType='none' m='35px 0 0'>
                      <Stack spacing='35px'>
                        <ListItem>
                          <Link href={'/mypage'}>
                            <Flex align='center' justify='center'>
                              <Image src="/icon-home.svg" alt='' w='1.2em' />
                              <Text color='white' marginLeft='10px' fontSize='14px'>ホーム</Text>
                            </Flex>
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link href={'/usage'}>
                            <Flex align='center' justify='center'>
                              <Image src="/icon-usage.svg" alt='' w='1.2em' />
                              <Text color='white' marginLeft='10px' fontSize='14px'>使い方</Text>
                            </Flex>
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link href={'/account/register'}>
                            <Flex align='center' justify='center'>
                              <Image src="/icon-register.svg" alt='' w='1.2em' />
                              <Text color='white' marginLeft='10px' fontSize='14px'>仕訳入力</Text>
                            </Flex>
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link href={'/account'}>
                            <Flex align='center' justify='center'>
                              <Image src="/icon-account.svg" alt='' w='1.2em' />
                              <Text color='white' marginLeft='10px' fontSize='14px'>仕訳一覧</Text>
                            </Flex>
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link href={'/report'}>
                            <Flex align='center' justify='center'>
                              <Image src="/icon-report.svg" alt='' w='1.2em' />
                              <Text color='white' marginLeft='10px' fontSize='14px'>損益レポート</Text>
                            </Flex>
                          </Link>
                        </ListItem>
                      </Stack>
                    </UnorderedList>
                  </DrawerContent>
                </DrawerBody>
              </DrawerOverlay>
            </Drawer>
          </Box>
        </Flex>
        {/* </Flex> */}
      </Flex>
    </header >
  )
}
