import React from 'react'
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import Link from 'next/link'
import { CloseIcon } from '@chakra-ui/icons'

type Props = {
  isOpen: boolean,
  onClose: () => void,
}

export const DrawerHamburger = ({ onClose, isOpen }: Props) => {
  return (
    <>
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
      </Drawer></>
  )
}
