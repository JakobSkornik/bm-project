import { createStore, createHook, Action } from 'react-sweet-state'
import { Components } from '../types'
import { Images } from '../types/Images'

export type State = {
  images: Images
  clear: boolean
  components: Components
  numOfPedestrians: number
  pause: boolean
  pedestriansToAdd: number
  showCtrlPanel: boolean
  showDestination: boolean
  showNeighbourhood: boolean
  showVelocity: boolean
}

const initialState = {
  images: {} as Images,
  clear: false,
  components: {} as Components,
  numOfPedestrians: 1,
  pause: false,
  pedestriansToAdd: 1,
  showCtrlPanel: true,
  showDestination: false,
  showNeighbourhood: false,
  showVelocity: false,
} as State

export type Actions = typeof actions

const actions = {
  setClear:
    (clear: boolean): Action<State> =>
    ({ setState }) => {
      const clearCanvas = () => {
        const timeId = setTimeout(() => {
          setState({ clear: clear })
        }, 100)

        return () => {
          clearTimeout(timeId)
        }
      }
      clearCanvas()
    },
  setComponents:
    (components: Components): Action<State> =>
    ({ setState }) => {
      setState({ components: components })
    },
  setImages:
    (images: Images): Action<State> =>
    ({ setState }) => {
      setState({ images: images })
    },
  setNumOfPedestrians:
    (num: number): Action<State> =>
    ({ setState }) => {
      setState({ numOfPedestrians: num })
    },
  setPedestriansToAdd:
    (num: number): Action<State> =>
    ({ setState }) => {
      setState({ pedestriansToAdd: num })
    },
  setShowCtrlPanel:
    (show: boolean): Action<State> =>
    ({ setState }) => {
      setState({ showCtrlPanel: show })
    },
  togglePause:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        pause: !getState().pause,
      })
    },
  toggleShowDestination:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        showDestination: !getState().showDestination,
      })
    },
  toggleShowNeighbourhood:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        showNeighbourhood: !getState().showNeighbourhood,
      })
    },
  toggleShowVelocity:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        showVelocity: !getState().showVelocity,
      })
    },
}

const store = createStore<State, Actions>({
  initialState,
  actions,
})

const useStore = createHook(store)

export default useStore
