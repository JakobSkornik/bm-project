import { createContext, FC } from 'react'
import { ControlPanelContextType, ControlPanelProps } from '../types'

export const ControlPanelContext = createContext<ControlPanelContextType>({
  showControlPanel: false,
  toggleShowControlPanel: (show: boolean) => {},
  showDestination: false,
  toggleShowDestination: () => {},
  showNeighbourhood: false,
  toggleShowNeighbourhood: () => {},
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
