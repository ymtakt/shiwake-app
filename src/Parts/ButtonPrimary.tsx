import { FC, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode,
  onClick?: () => void,
  marginRight?: string
}

export const ButtonPrimary: FC<Props> = ({ children, onClick, marginRight }) => {
  return (
    <Button p='19px 14px' backgroundColor='#3AA796' color='white' fontSize='14px' textAlign='center' marginRight={marginRight} onClick={onClick}>{children}</Button>
  )
}

