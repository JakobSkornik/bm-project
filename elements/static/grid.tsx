import P5Component, { P5ComponentParams } from '..'

export type GridParams = P5ComponentParams & {
  w: number
  h: number
}

export default class Grid extends P5Component {
  tiles: boolean[][] = []
  w: number
  h: number

  constructor(params: GridParams) {
    super(params as P5ComponentParams)

    this.w = params.w
    this.h = params.h

    for (let y = 0; y < this.h; y++) {
      let temp: boolean[] = []
      for (let x = 0; x < this.w; x++) {
        temp.push(false)
      }
      this.tiles[y] = [...temp]
    }
  }
}
