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
          <Box w={{ base: "100%", md: "calc(100% - 135px)" }} left={{ base: "0px", md: "135px" }} position='relative' minH='85vh' top='65px' backgroundColor='#F5F5F5' zIndex='0'>
            <Box p={{ base: "55px 15px", md: "55px 35px" }} w={{ base: "100%", md: "1200px" }} h='100%' m=' 0 auto' backgroundColor='#F5F5F5'>
              {children}
            </Box>
          </Box>
        </Flex>
      </main>
      <Footer />
    </>
  )
}
