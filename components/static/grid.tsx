import p5Types from 'p5'

import { P5Component } from '..'

export default class Grid extends P5Component {
  tiles: boolean[][] = []

  constructor(w: number, h: number, line: number[]) {
    super()

    const [x1, y1, x2, y2] = line

    for (let y = 0; y < h; y++) {
      let temp: boolean[] = []
      for (let x = 0; x < w; x++) {
        const d = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)
        if (d >= 0) {
          break
        } else {
          temp.push(false)
        }
      }
      this.tiles[y] = [...temp]
    }
  }

  show = (p5: p5Types) => {}

  move = () => {}
}
