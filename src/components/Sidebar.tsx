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
import { sidebars } from '../util'


export const Sidebar = () => {
  return (
    <>
      <Box display={{ base: "none", md: "block" }} backgroundColor='#3D4A4F' w='135px' h='100%' marginTop='65px' position='fixed' zIndex='1000'>
        <nav>
          <UnorderedList listStyleType='none' m='35px 0 0'>
            <Stack spacing='35px'>
              {sidebars.map((item, index) => (
                <ListItem key={index}>
                  <Link href={item.href}>
                    <Flex align='center' justify='center'>
                      <Image src={item.src} alt='' w='1.2em' />
                      <Text color='white' marginLeft='10px' fontSize='14px'>{item.name}</Text>
                    </Flex>
                  </Link>
                </ListItem>
              ))}
            </Stack>
          </UnorderedList>
        </nav>
      </Box>
    </>
  )
}
