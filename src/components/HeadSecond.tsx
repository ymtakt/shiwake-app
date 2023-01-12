import { FC, ReactNode } from 'react'

import { Heading } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const HeadSecond: FC<Props> = ({ children }) => {
  return (
    <Heading as='h2' color='#162533' fontSize='20px' fontWeight='600' marginBottom='10px'>{children}</Heading>
  )
}

