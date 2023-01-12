import { FC, ReactNode } from 'react'

import { Box } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const ContainerBox: FC<Props> = ({ children }) => {
  return (
    <Box p='35px 25px' backgroundColor='white' border='1px solid #DDE4ED'>{children}</Box>
  )
}

