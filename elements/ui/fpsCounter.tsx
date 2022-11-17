import p5Types from 'p5'
import P5Component, { P5ComponentParams } from '..'

export type FPSCounterParams = P5ComponentParams & {
  x: number
  y: number
}

export default class FPSCounter extends P5Component {
  x: number
  y: number

  constructor(params: FPSCounterParams) {
    super(params as P5ComponentParams)
    this.x = params.x
    this.y = params.y
  }

  show = (p5: p5Types) => {
    const w = 60
    const h = 22
    p5.noStroke()
    p5.fill(236, 236, 236, 100)
    p5.rect(this.x, this.y, w, h, 2)

    p5.fill(0)
    p5.text( `FPS: ${Math.round(p5.frameRate())}`, this.x + 5, this.y + 15)
  }
}
