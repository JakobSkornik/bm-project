import p5Types from 'p5'
import P5Component, { P5ComponentParams } from '..'
import { AppConfig } from '../../types'

export type PedestrianCounterParams = P5ComponentParams & {
  x: number
  y: number
}

export default class PedestrianCounter extends P5Component {
  x: number
  y: number

  constructor(params: PedestrianCounterParams) {
    super(params as P5ComponentParams)
    this.x = params.x
    this.y = params.y
  }

  show = (p5: p5Types, appConfig?: AppConfig) => {
    if (!appConfig) {
      return
    }

    const w = 55
    const h = 22
    p5.noStroke()
    p5.fill(236, 236, 236, 100)
    p5.rect(this.x, this.y, w, h, 2)

    p5.fill(0)
    p5.text( `N: ${appConfig.numOfPedestrians}`, this.x + 5, this.y + 15)
  }

  resize = (p5: p5Types) => {
    this.x = p5.width - 60
    this.y = 30
  }
}
