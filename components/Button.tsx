import Image from 'next/image'
import React, { MouseEvent } from 'react'

import { ButtonProps } from '../types'

const sx = {
  button: {
    fontSize: '20px',
    borderRadius: '2px',
    border: '1px solid #E0E0E060',
    color: 'green',
    outline: 'none',
  },
  icon: {},
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
        <span>
          <Image
            src={`/icons/${props.icon}`}
            alt="BtnIcon"
            width={props.iconSize ?? 30}
            height={props.iconSize ?? 30}
            style={sx.icon}
            priority
          />
        </span>
      )}
      <span>{props.text}</span>
    </button>
  )
}

export default Button
