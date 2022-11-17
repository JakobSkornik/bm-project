import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import ControlPanelProvider from '../context/controlPanel'
import { ControlPanelContextType } from '../types'

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
  const [pedestrians, setPedestrians] = useState(1)
  const [clear, onClear] = useState(false)
  const [ctrlPanel, toggleCtrlPanel] = useState(true)
  const [destination, toggleDestination] = useState(false)
  const [neighbourhood, toggleNeighbourhood] = useState(false)
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

  const updateControlPanel = (show: boolean) => {
    toggleCtrlPanel(show)
  }

  const updateDestination = () => {
    toggleDestination(!destination)
  }

  const updateNeighbourhood = () => {
    toggleNeighbourhood(!neighbourhood)
  }

  const setNewAddNumber = (num: number) => {
    setPedestrians(num)
  }

  const clearCanvas = () => {
    const timeId = setTimeout(() => {
      onClear(!clear)
    }, 100)

    return () => {
      clearTimeout(timeId)
    }
  }

  const controlPanelContext = {
    addNumber: pedestrians,
    clear: clear,
    setAddNumber: setNewAddNumber,
    showControlPanel: ctrlPanel,
    showDestination: destination,
    showNeighbourhood: neighbourhood,
    onClear: clearCanvas,
    toggleShowControlPanel: updateControlPanel,
    toggleShowDestination: updateDestination,
    toggleShowNeighbourhood: updateNeighbourhood,
  } as ControlPanelContextType

  return (
    <ControlPanelProvider value={controlPanelContext}>
      <div style={{ ...sx.welcomeMessage, opacity: showMsg ? '0.9' : '0' }}>
        <h1>press SPACEBAR to spawn more humaboids</h1>
      </div>
      <div style={{ ...sx.ctrlPanelMessage, opacity: showMsg ? '0.9' : '0' }}>
        <h2>modify scene with control panel</h2>
      </div>
      <Component {...pageProps} />
    </ControlPanelProvider>
  )
}
