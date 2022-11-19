import p5Types from 'p5'
import { State } from '../types'

export default class P5Component {
  show = (p5: p5Types, state: State) => {}

  move = (state: State) => {}
}
