import p5Types from 'p5'
import P5Component from '..'
import { State } from '../../types'

export default class Metrics extends P5Component {
  constructor() {
    super()
  }

  show = (p5: p5Types, state: State) => {
    this.showFPS(p5)
    this.showNCount(p5, state)
    this.showPlaybackSpeed(p5, state)
  }

  showFPS = (p5: p5Types) => {
    const w = p5.width / 20
    const h = p5.height / 26
    const x = p5.width - 1.2 * w
    const y = 0.5 * h
    const textSize = 0.6 * h

    p5.noStroke()
    p5.fill(0)
    p5.textSize(textSize)
    p5.text(
      `FPS: ${Math.round(p5.frameRate())}`,
      x + 0.05 * w,
      y + textSize * 1.15,
    )
  }

  showNCount = (p5: p5Types, state: State) => {
    const w = p5.width / 20
    const h = p5.height / 26
    const x = p5.width - 1.2 * w
    const y = 1.6 * h
    const textSize = 0.6 * h

    p5.noStroke()
    p5.fill(0)
    p5.textSize(textSize)
    p5.text(`N: ${state.numOfPedestrians}`, x + 0.05 * w, y + textSize * 1.15)
  }

  showPlaybackSpeed = (p5: p5Types, state: State) => {
    const w = p5.width / 20
    const h = p5.height / 26
    const x = p5.width - 1.2 * w
    const y = 2.7 * h
    const textSize = 0.6 * h

    p5.noStroke()
    p5.fill(0)
    p5.textSize(textSize)
    p5.text(`PS: ${(state.playbackSpeed * 5).toFixed(1)}x`, x + 0.05 * w, y + textSize * 1.15)
  }
}
