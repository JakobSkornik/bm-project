import p5Types from 'p5'

import { P5Component } from '..'
import { Assets } from '../../types/Assets'

export default class Background extends P5Component {
  assets: Assets

  constructor(assets: Assets) {
    super()
    this.assets = assets
  }

  show = (p5: p5Types) => {
    p5.background(236, 236, 236)
    this.drawBuildings(p5)
  }

  drawBuildings = (p5: p5Types) => {
    const numOfBuildings = 8
    const stepX = 210
    const stepY = 93
    let x = -60
    let y = -293
    for (let i = 0; i < numOfBuildings; i++) {
      p5.image(this.assets['block'], x, y, 500, 500)
      x += stepX
      y += stepY
    }

    // p5.image(this.assets['sidewalk'], 0, 0, p5.width, p5.height)
  }
}
