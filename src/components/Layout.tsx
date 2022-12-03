import { FC, ReactNode } from 'react'
import { Flex, Box, Container } from '@chakra-ui/react'

import { Header } from "./Header"
import { Footer } from "./Footer"
import { Sidebar } from './Sidebar'
import styles from '../../styles/Header.module.scss'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header className={styles.header_position} />
      <main>
        <Flex>
          <Sidebar />
          <Box position='relative' left='135px' w='calc(100% - 135px)' minH='85vh' top='65px' backgroundColor='#F5F5F5'>
            <Box p='55px 75px' maxW='1200' m=' 0 auto'>
              {children}
            </Box>
          </Box>
        </Flex>
      </main>
      <Footer />
    </>
  )
}
