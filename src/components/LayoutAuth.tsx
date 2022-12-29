import { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

import { Header } from "./Header"
import { Footer } from "./Footer"

type Props = {
  children: ReactNode
}

export const LayoutAuth: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main >
        <Flex w={{ base: "95%", md: "auto" }} margin={{ base: "0 auto", md: "auto" }} minH='85vh' justify='center'>
          {children}
        </Flex>
      </main>
      <Footer />
    </>
  )
}