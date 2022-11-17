import p5Types from 'p5'
import P5Component from '..'

export default class P5Background extends P5Component {
  constructor() {
    super()
  }

  show = (p5: p5Types) => {
    p5.clear()
    p5.background(0, 0, 0, 0)
  }
}
