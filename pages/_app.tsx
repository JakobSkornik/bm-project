import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import ControlPanelProvider from '../context/controlPanel'
import { ControlPanelContextType } from '../types'

/**
 * Default App Wrapper
 */

export default function App({ Component, pageProps }: AppProps) {
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

  const controlPanelContext = {
    showControlPanel: ctrlPanel,
    showDestination: destination,
    showNeighbourhood: neighbourhood,
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
