export type ControlPanelContextType = {
  showControlPanel: boolean
  toggleShowControlPanel: (show: boolean) => void
  showDestination: boolean
  toggleShowDestination: () => void
  showNeighbourhood: boolean
  toggleShowNeighbourhood: () => void
  clear: boolean
  onClear: () => void
  addNumber: number
  setAddNumber: (num: number) => void
}
