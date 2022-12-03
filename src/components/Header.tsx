import Link from 'next/link'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
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
        <Box>
          {user !== null &&
            <Flex align='center' onClick={handleClick} cursor='pointer'>
              <Image src="/logout.svg" alt="shiwake" width='21px' height='auto' />
              <Text color='#fff' fontSize='14px' fontWeight='600' ml='4px' >ログアウト</Text>
            </Flex>
          }
        </Box>
      </Flex>
    </header >
  )
}
