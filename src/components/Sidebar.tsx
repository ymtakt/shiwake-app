import Link from 'next/link'
import {
  Box,
  ListItem,
  UnorderedList,
  Flex,
  Image,
  Text,
  Stack
} from '@chakra-ui/react'


export const Sidebar = () => {
  return (
    <>
      <Box display={{ base: "none", md: "block" }} backgroundColor='#3D4A4F' w='135px' h='100%' marginTop='65px' position='fixed' zIndex='1000'>
        <nav>
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
        </nav>
      </Box>
    </>
  )
}
