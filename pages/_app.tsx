import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

/**
 * Default App Wrapper
 */

const sx = {
  welcomeMessage: {
    position: 'fixed' as 'fixed',
    pointerEvents: 'none' as 'none',
    width: '400px',
    top: '100px',
    left: 'calc(50vw - 200px)',
    color: '#303030',
    transition: 'opacity 0.5s ease-out',
    zIndex: '1',
  },
  ctrlPanelMessage: {
    position: 'fixed' as 'fixed',
    pointerEvents: 'none' as 'none',
    width: '500px',
    bottom: '100px',
    left: 'calc(50vw - 220px)',
    color: '#303030',
    transition: 'opacity 0.5s ease-out',
    zIndex: '1',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  const [showMsg, setShowMsg] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowMsg(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div style={{ ...sx.welcomeMessage, opacity: showMsg ? '0.9' : '0' }}>
        <h1>press SPACEBAR to spawn more humaboids</h1>
      </div>
      <div style={{ ...sx.ctrlPanelMessage, opacity: showMsg ? '0.9' : '0' }}>
        <h2>modify scene with control panel</h2>
      </div>
      <Component {...pageProps} />
    </>
  )
}
