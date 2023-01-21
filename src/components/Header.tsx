import Link from 'next/link'
import { Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, IconButton, Image, ListItem, Stack, Text, UnorderedList, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { signOut } from "firebase/auth";
import { useRouter } from 'next/router';

import styles from '../../styles/Header.module.scss'
import { auth } from '../firebase';
import { useAuth, userState } from '../atom';
import { DrawerHamburger } from './DrawerHamburger';
import { useRecoilState } from 'recoil';

type Props = {
  className?: string
}

export const Header = (props: Props) => {

  // const user = useAuth();
  const [user, setUser] = useRecoilState(userState)
  const router = useRouter();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleClick = (() => {
    signOut(auth).then(() => {
      console.log('ログアウトしました')
      router.push("/login");
    }).catch((err) => {
      console.log(err);
    })
  })

  return (
    <>
      <header className={styles.header + (props.className ? ` ${props.className}` : "")} >
        <Flex justify='space-between' align='center'>
          <Link href={'/'}>
            <Image src="/logo-wh.png" alt="shiwake" width='85px' height='auto' />
          </Link>
          <Flex>
            {user !== null &&
              <Flex align='center' onClick={handleClick} cursor='pointer'>
                <Image src="/logout.svg" alt="shiwake" width='21px' height='auto' />
                <Text color='#fff' fontSize='14px' fontWeight='600' ml='4px' >ログアウト</Text>
              </Flex>
            }
            <Box display={{ base: "block", md: "none" }} marginLeft='15px' >
              <IconButton aria-label="メニューボタン"
                icon={<HamburgerIcon color="#fff" />}
                size="md" variant="unstyled"
                display={{ base: "block", md: "none" }}
                onClick={onOpen}
                cursor='pointer'
              />
              <DrawerHamburger isOpen={isOpen} onClose={onClose} />
            </Box>
          </Flex>
        </Flex>
      </header >
    </>
  )
}
