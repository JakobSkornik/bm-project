import p5Types from 'p5'
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

  // This method resizes tiles and preserves data
  resize = (p5: p5Types, val: boolean = false) => {
    this.w = p5.width
    this.h = p5.height

    const newRow = (row: boolean[]) => Array.from({ length: this.w }, (_, i) => {
      return i < row.length ? row[i] : val
    });
    this.tiles = Array.from({ length: this.h }, (_, i) => {
      return i < this.tiles.length ? newRow(this.tiles[i]) : Array.from({ length: this.w }, () => val);
    });
  }
}
