import p5Types from 'p5'
import P5Component from '..'
import { State } from '../../store'

export default class PedestrianCounter extends P5Component {
  constructor() {
    super()
  }

  show = (p5: p5Types, state?: State) => {
    if (!state) {
      return
    }
    const w = p5.width / 20
    const h = p5.height / 26
    const x = p5.width - 1.2 * w
    const y = 1.6 * h
    const textSize = 0.6 * h

    p5.noStroke()
    p5.fill(236, 236, 236, 100)
    p5.rect(x, y, w, h, 2)

    p5.fill(0)
    p5.text(`N: ${state.numOfPedestrians}`, x + 0.05 * w, y + textSize * 1.15)
  }
}
