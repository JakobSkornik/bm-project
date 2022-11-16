import p5Types from 'p5'
import P5Component, { P5ComponentParams } from '..'

export type BackgroundParams = P5ComponentParams & {}

export default class P5Background extends P5Component {
  constructor(params: BackgroundParams) {
    super(params as P5ComponentParams)
  }

  show = (p5: p5Types) => {
    p5.clear()
    p5.background(0, 0, 0, 0)
  }
}
