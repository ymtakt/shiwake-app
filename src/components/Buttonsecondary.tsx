import { FC, ReactNode } from 'react'

import { Button } from '@chakra-ui/react'

type Props = {
  children: ReactNode,
  onClick?: () => void
}

export const Buttonsecondary: FC<Props> = ({ children, onClick }) => {
  return (
    <Button p='19px 14px' marginRight='12px' backgroundColor='white' color='#3AA796' fontSize='14px' textAlign='center' border='1px solid #3AA796' onClick={onClick}>{children}</Button>
  )
}

