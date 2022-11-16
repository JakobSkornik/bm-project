import '../styles/globals.css'
import type { AppProps } from 'next/app'

/**
 * Default App Wrapper
 */

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
