import { Box, Flex, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'

import styles from '../../styles/Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Flex justify='center' align='center'>
        <Text fontSize='11px' mr='5px'>Powered by{' '}</Text>
        <Link href={'/'}>
          <Image src="/logo.png" alt="Vercel Logo" width='45px' height='auto' />
        </Link>
      </Flex>
    </footer>
  )
}
