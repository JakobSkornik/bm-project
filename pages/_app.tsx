import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Components, Images } from '../types'
import GlobalContextProvider from '../context/globalContext'

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

  const [clear, setClear] = useState<boolean>(false)
  const [components, setComponents] = useState<Components>({})
  const [images, setImages] = useState<Images>({})
  const [increaseSpeed, setIncreaseSpeed] = useState<boolean>(false)
  const [numOfPedestrians, setNumOfPedestrians] = useState<number>(1)
  const [pause, setPause] = useState<boolean>(false)
  const [pedestriansToAdd, setPedestriansToAdd] = useState<number>(1)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.2)
  const [showCtrlPanel, setShowCtrlPanel] = useState<boolean>(false)
  const [showDestination, setShowDestination] = useState<boolean>(false)
  const [showNeighbourhood, setShowNeighbourhood] = useState<boolean>(false)
  const [showVelocity, setShowVelocity] = useState<boolean>(false)

  const appContext = {
    state: {
      clear: clear,
      components: components as Components,
      images: images as Images,
      numOfPedestrians: numOfPedestrians,
      pause: pause,
      pedestriansToAdd: pedestriansToAdd,
      playbackSpeed: playbackSpeed,
      showCtrlPanel: showCtrlPanel,
      showDestination: showDestination,
      showNeighbourhood: showNeighbourhood,
      showVelocity: showVelocity,
    },
    actions: (key: string, val?: any) => {
      switch (key) {
        case 'clear': {
          const timeId = setTimeout(() => {
            setClear(val)
          }, 50)

          return () => {
            clearTimeout(timeId)
          }

          break
        }
        case 'components': {
          setComponents(val)
          break
        }
        case 'images': {
          setImages(val)
          break
        }
        case 'playbackSpeed': {
          const timeId = setTimeout(() => {
            setPlaybackSpeed(playbackSpeed + val)
          }, 50)

          return () => {
            clearTimeout(timeId)
          }
          break
        }
        case 'numOfPedestrians': {
          setNumOfPedestrians(val)
          break
        }
        case 'pause': {
          setPause(!pause)
          break
        }
        case 'pedestriansToAdd': {
          setPedestriansToAdd(val)
          break
        }
        case 'showCtrlPanel': {
          setShowCtrlPanel(val)
          break
        }
        case 'showDestination': {
          setShowDestination(!showDestination)
          break
        }
        case 'showNeighbourhood': {
          setShowNeighbourhood(!showNeighbourhood)
          break
        }
        case 'showVelocity': {
          setShowVelocity(!showVelocity)
          break
        }
        default: {
          break
        }
      }
    },
  }

  return (
    <GlobalContextProvider value={appContext}>
      <div style={{ ...sx.welcomeMessage, opacity: showMsg ? '0.9' : '0' }}>
        <h1>press SPACEBAR to spawn more humaboids</h1>
      </div>
      <div style={{ ...sx.ctrlPanelMessage, opacity: showMsg ? '0.9' : '0' }}>
        <h2>modify scene with control panel</h2>
      </div>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}
