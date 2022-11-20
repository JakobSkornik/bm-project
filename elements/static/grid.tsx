import p5Types from 'p5'
import P5Component from '..'

export type GridParams = {
  w: number
  h: number
}

export default class Grid extends P5Component {
  w: number
  h: number

  constructor(params: GridParams) {
    super()

    this.w = params.w
    this.h = params.h
  }

  resize = (p5: p5Types) => {
    this.w = p5.width
    this.h = p5.height
  }
}
