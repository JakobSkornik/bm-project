import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Components, Images } from '../types'
import GlobalContextProvider from '../context/globalContext'

/**
 * Default App Wrapper
 */

const sx = {
  message: {
    fontSize: 'min(2vh, 2vw)',
    position: 'fixed' as 'fixed',
    pointerEvents: 'none' as 'none',
    color: '#303030',
    transition: 'opacity 0.5s ease-out',
    zIndex: '1',
  },
  welcomeMessage: {
    width: '30vw',
    top: '10vh',
    left: '35vw',
  },
  ctrlPanelMessage: {
    width: '30vw',
    bottom: '10vh',
    left: '35vw',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  const [showMsg, setShowMsg] = useState(true)

  useEffect(() => {

    // Disable right click menu so 2nd mb can be used by app
    document.addEventListener("contextmenu", function (e){
      e.preventDefault();
  }, false);

    const timeId = setTimeout(() => {
      setShowMsg(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }

  }, [])

  return (
    <GlobalContextProvider>
      <div style={{ ...sx.message, ...sx.welcomeMessage, opacity: showMsg ? '0.9' : '0' }}>
        <h1>press SPACEBAR to spawn more humaboids</h1>
      </div>
      <div style={{ ...sx.message, ...sx.ctrlPanelMessage, opacity: showMsg ? '0.9' : '0' }}>
        <h2>modify scene with control panel</h2>
      </div>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}
