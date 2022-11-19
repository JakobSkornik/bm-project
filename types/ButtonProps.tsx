import { MouseEvent, ReactNode } from 'react'

export type ButtonProps = {
  children?: ReactNode;
  text: string
  value: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  style?: { [Key: string]: string }
  icon?: string
  iconSize?: number
  onMouseEnter?: (e: MouseEvent<HTMLButtonElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLButtonElement>) => void
}
