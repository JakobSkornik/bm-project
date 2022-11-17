import p5Types from 'p5'

import Grid from '../static/grid'
import P5Component from '..'
import Pedestrian, { PedestrianParams } from './pedestrian'
import { getRandomInt } from '../hooks/getRandomInt'
import { State } from '../../store'
import { Images } from '../../types'

export type CrowdParams = {
  grid: Grid
  images: Images
  numOfPedestrians: number
}

export default class Crowd extends P5Component {
  grid: Grid
  images: Images
  numOfPedestrians: number
  pedestrians: Pedestrian[] = []
  frame: number = 0

  constructor(params: CrowdParams) {
    super()
    this.images = params.images
    this.grid = params.grid
    this.numOfPedestrians = params.numOfPedestrians

    for (let i = 0; i < this.numOfPedestrians; i++) {
      this.pedestrians.push(
        new Pedestrian({
          grid: this.grid,
          images: params.images,
          movementSpeed: getRandomInt(5, 1),
        } as PedestrianParams),
      )
    }
  }

  show = (p5: p5Types, state?: State) => {
    for (let i = 0; i < this.numOfPedestrians; i++) {
      this.pedestrians[i].show(p5, state)
    }
    this.move(state)
  }

  move = (state?: State) => {
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

    this.pedestrians.push(
      new Pedestrian({
        x: x,
        y: y,
        assets: this.images,
        grid: this.grid,
        images: this.images,
        movementSpeed: getRandomInt(5, 1),
      } as PedestrianParams),
    )
  }
}
