import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../src/theme/ThemeAuth'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </>
  )

}
