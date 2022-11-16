import p5Types from 'p5'
import { AppConfig } from '../types/AppConfig'
import { Assets } from '../types/Assets'

export type P5ComponentParams = {
  assets: Assets
}

export default class P5Component {
  assets: Assets

  constructor(params: P5ComponentParams) {
    this.assets = params.assets
  }

  show = (p5: p5Types, appConfig?: AppConfig) => {}

  move = () => {}
}
