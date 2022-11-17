import p5Types from 'p5'

import Grid from '../static/grid'
import Pedestrian, { PedestrianParams } from './pedestrian'
import P5Component, { P5ComponentParams } from '..'
import { getRandomInt } from '../hooks/getRandomInt'
import { AppConfig } from '../../types'

export type CrowdParams = P5ComponentParams & {
  numOfPedestrians?: number
  grid: Grid
}

export default class Crowd extends P5Component {
  numOfPedestrians: number
  pedestrians: Pedestrian[] = []
  grid: Grid
  frame: number = 0

  constructor(params: CrowdParams) {
    super(params as P5ComponentParams)
    this.grid = params.grid
    this.numOfPedestrians = params.numOfPedestrians ?? 0

    for (let i = 0; i < this.numOfPedestrians; i++) {
      this.pedestrians.push(
        new Pedestrian({
          assets: this.assets,
          grid: this.grid,
          movementSpeed: getRandomInt(4, 1),
        } as PedestrianParams),
      )
    }
  }

  show = (p5: p5Types, appConfig?: AppConfig) => {
    for (let i = 0; i < this.numOfPedestrians; i++) {
      this.pedestrians[i].show(p5, appConfig)
    }
    this.move(appConfig)
  }

  move = (appConfig?: AppConfig) => {
    for (let i = 0; i < this.numOfPedestrians; i++) {
      /**
       * TODO
       * Extend appconfig to contain boolean for toggling neighbours
       */

      this.pedestrians[i].getNeighbours(this)
      this.pedestrians[i].move()
    }
  }

  addPedestrian = (x: number, y: number) => {
    this.numOfPedestrians++

    this.pedestrians.push(new Pedestrian({
      x: x,
      y: y,
      assets: this.assets,
      grid: this.grid,
      movementSpeed: getRandomInt(5, 1),
    } as PedestrianParams))
  }
}
