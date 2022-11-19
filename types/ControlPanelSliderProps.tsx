import { MouseEvent } from 'react'

export type ControlPanelSliderProps = {
  stateVar: string
  min: number
  max: number
  default: number
  step: number
  vertical: boolean
  onMouseEnter?: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void
}
