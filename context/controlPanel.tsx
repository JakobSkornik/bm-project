import { createContext, FC } from 'react'
import { ControlPanelContextType, ControlPanelProps } from '../types'

export const ControlPanelContext = createContext<ControlPanelContextType>({
  showControlPanel: false,
  toggleShowControlPanel: () => {},
  showDestination: false,
  toggleShowDestination: () => {},
  showNeighbourhood: false,
  toggleShowNeighbourhood: () => {},
  clear: false,
  onClear: () => {},
  addNumber: 0,
  setAddNumber: () => {}
})

const ControlPanelProvider: FC<ControlPanelProps> = (
  props: ControlPanelProps,
) => {
  return (
    <ControlPanelContext.Provider value={props.value}>
      {props.children}
    </ControlPanelContext.Provider>
  )
}

export default ControlPanelProvider
