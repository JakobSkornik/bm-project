import { createContext, FC, useState } from 'react'
import { Components, GlobalContextType, GlobalContextProps, Images } from '../types'

export const GlobalContext = createContext<GlobalContextType>({
  state: {},
  actions: () => {},
})

const GlobalContextProvider: FC<GlobalContextProps> = (props: GlobalContextProps) => {
  const [alignment, setAlignment] = useState<boolean>(false)
  const [alignmentFactor, setAlignmentFactor] = useState<number>(0.05)
  const [bias, setBias] = useState<boolean>(false)
  const [biasFactor, setBiasFactor] = useState<number>(0.5)
  const [bounds, setBounds] = useState<boolean>(false)
  const [clear, setClear] = useState<boolean>(false)
  const [cohesion, setCohesion] = useState<boolean>(false)
  const [cohesionFactor, setCohesionFactor] = useState<number>(0.0005)
  const [components, setComponents] = useState<Components>({})
  const [images, setImages] = useState<Images>({})
  const [numOfPedestrians, setNumOfPedestrians] = useState<number>(1)
  const [pause, setPause] = useState<boolean>(false)
  const [pedestriansToAdd, setPedestriansToAdd] = useState<number>(1)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1)
  const [preferredRange, setPreferredRange] = useState<number>(50)
  const [protectedRange, setProtectedRange] = useState<number>(10)
  const [separation, setSeparation] = useState<boolean>(false)
  const [separationFactor, setSeparationFactor] = useState<number>(0.5)
  const [showCtrlPanel, setShowCtrlPanel] = useState<boolean>(false)
  const [showDestination, setShowDestination] = useState<boolean>(false)
  const [showPreferredRange, setShowPreferredRange] = useState<boolean>(false)
  const [showProtectedRange, setShowProtectedRange] = useState<boolean>(false)
  const [showVelocity, setShowVelocity] = useState<boolean>(false)

  const appContext = {
    state: {
      alignment: alignment,
      alignmentFactor: alignmentFactor,
      bias: bias,
      biasFactor: biasFactor,
      bounds: bounds,
      clear: clear,
      cohesion: cohesion,
      cohesionFactor: cohesionFactor,
      components: components as Components,
      images: images as Images,
      numOfPedestrians: numOfPedestrians,
      pause: pause,
      pedestriansToAdd: pedestriansToAdd,
      playbackSpeed: playbackSpeed,
      preferredRange: preferredRange,
      protectedRange: protectedRange,
      separation: separation,
      separationFactor: separationFactor,
      showCtrlPanel: showCtrlPanel,
      showDestination: showDestination,
      showPreferredRange: showPreferredRange,
      showProtectedRange: showProtectedRange,
      showVelocity: showVelocity,
    },
    actions: (key: string, val?: any) => {
      switch (key) {
        case 'alignment': {
          setAlignment(!alignment)
          break
        }
        case 'alignmentFactor': {
          setAlignmentFactor(val)
          break
        }
        case 'bias': {
          setBias(!bias)
          break
        }
        case 'biasFactor': {
          setBiasFactor(val)
          break
        }
        case 'bounds': {
          setBounds(!bounds)
          break
        }
        case 'clear': {
          setClear(val)
          break
        }
        case 'cohesion': {
          setCohesion(!cohesion)
          break
        }
        case 'cohesionFactor': {
          setCohesionFactor(val)
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
          setPlaybackSpeed(val)
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
        case 'preferredRange': {
          setPreferredRange(val)
          break
        }
        case 'protectedRange': {
          setProtectedRange(val)
          break
        }
        case 'separation': {
          setSeparation(!separation)
          break
        }
        case 'separationFactor': {
          setSeparationFactor(val)
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
        case 'showPreferredRange': {
          setShowPreferredRange(!showPreferredRange)
          break
        }
        case 'showProtectedRange': {
          setShowProtectedRange(!showProtectedRange)
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
    <GlobalContext.Provider value={appContext}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
