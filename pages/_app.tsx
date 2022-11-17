import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import ControlPanelProvider from '../context/controlPanel'
import { ControlPanelContextType } from '../types'

/**
 * Default App Wrapper
 */

export default function App({ Component, pageProps }: AppProps) {
  const [pedestrians, setPedestrians] = useState(1)
  const [clear, onClear] = useState(false)
  const [ctrlPanel, toggleCtrlPanel] = useState(true)
  const [destination, toggleDestination] = useState(false)
  const [neighbourhood, toggleNeighbourhood] = useState(false)

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
      <Component {...pageProps} />
    </ControlPanelProvider>
  )
}
