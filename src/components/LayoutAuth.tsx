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
        <Flex minH='85vh' justify='center'>
          {children}
        </Flex>
      </main>
      <Footer />
    </>
  )
}