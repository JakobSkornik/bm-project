import Image from 'next/image'
import React, { MouseEvent } from 'react'

import { ButtonProps } from '../types'

const sx = {
  button: {
    position: 'relative' as 'relative',
    borderRadius: 'min(1vh, 1vw)',
    border: '1px solid #E0E0E060',
    color: 'green',
    outline: 'none',
  },
  icon: {
    objectFit: 'cover' as 'cover',
    transform: 'scale(0.8)',
    pointerEvents: 'none' as 'none',
  },
}

const Button = (props: ButtonProps) => {
  const mouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (!props.onMouseEnter) {
      return
    }

    props.onMouseEnter(e)
  }

  const mouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    if (!props.onMouseLeave) {
      return
    }

    props.onMouseLeave(e)
  }

  return (
    <button
      value={props.value}
      type="button"
      style={{ ...sx.button, ...props.style }}
      onMouseDown={props.onClick}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {props.icon && (
        <Image
          src={`/icons/${props.icon}`}
          alt="BtnIcon"
          fill
          style={sx.icon}
          sizes="width: 100%"
          priority
        />
      )}
      <span>{props.text}</span>
      {props.children}
    </button>
  )
}

export default Button
