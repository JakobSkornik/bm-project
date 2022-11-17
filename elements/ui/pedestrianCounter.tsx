import p5Types from 'p5'
import P5Component from '..'
import { State } from '../../store'

export type PedestrianCounterParams = {
  x: number
  y: number
}

export default class PedestrianCounter extends P5Component {
  x: number
  y: number

  constructor(params: PedestrianCounterParams) {
    super()
    this.x = params.x
    this.y = params.y
  }

  show = (p5: p5Types, state?: State) => {
    if (!state) {
      return
    }

    const w = 55
    const h = 22
    p5.noStroke()
    p5.fill(236, 236, 236, 100)
    p5.rect(this.x, this.y, w, h, 2)

    p5.fill(0)
    p5.text( `N: ${state.numOfPedestrians}`, this.x + 5, this.y + 15)
  }

  resize = (p5: p5Types) => {
    this.x = p5.width - 60
    this.y = 30
  }
}
