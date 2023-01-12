import { FC, ReactNode } from 'react'

import { Box } from '@chakra-ui/react'

type Props = {
  children: ReactNode,
  marginBottom?: string
}

export const SubText: FC<Props> = ({ children, marginBottom }) => {
  return (
    <Box as='span' display='block' color='#858C90' fontSize='14px' fontWeight='600' marginBottom={marginBottom}> {children}</Box >
  )
}

