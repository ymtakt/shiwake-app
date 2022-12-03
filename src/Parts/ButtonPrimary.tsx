import { FC, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode,
  onClick?: () => void
}

export const ButtonPrimary: FC<Props> = ({ children, onClick }) => {
  return (
    <Button p='19px 14px' backgroundColor='#3AA796' color='white' fontSize='14px' textAlign='center' onClick={onClick}>{children}</Button>
  )
}

