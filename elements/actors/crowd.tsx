import p5Types from 'p5'

import Grid from '../static/grid'
import P5Component from '..'
import Pedestrian, { PedestrianParams } from './pedestrian'
import { getRandomInt } from '../hooks/getRandomInt'
import { Images, State } from '../../types'
import Predator, { PredatorParams } from './predator'

export type CrowdParams = {
  grid: Grid
  images: Images
  numOfPedestrians: number
}

export default class Crowd extends P5Component {
  grid: Grid
  images: Images
  pedestrians: Pedestrian[] = []
  predators: Predator[] = []
  frame: number = 0

  constructor(params: CrowdParams) {
    super()
    this.images = params.images
    this.grid = params.grid
  }

  show = (p5: p5Types, state: State) => {
    while (this.pedestrians.length < state.numOfPedestrians) {
      this.addPedestrian([p5.mouseX, p5.mouseY])
    }

    while (this.predators.length < state.numOfPredators) {
      this.addPredator([p5.mouseX, p5.mouseY])
    }

    for (let i = 0; i < this.pedestrians.length; i++) {
      this.pedestrians[i].show(p5, state)
    }
    for (let i = 0; i < this.predators.length; i++) {
      this.predators[i].show(p5, state)
    }

    this.move(state)
  }

  move = (state: State) => {
    for (let i = 0; i < this.pedestrians.length; i++) {
      this.pedestrians[i].move(state)
    }
    for (let i = 0; i < this.predators.length; i++) {
      this.predators[i].move(state)
    }
  }

  addPedestrian = (loc?: number[]) => {
    this.pedestrians.push(
      new Pedestrian({
        x: loc ? loc[0] : undefined,
        y: loc ? loc[1] : undefined,
        crowd: this,
        grid: this.grid,
        images: this.images,
        movementSpeed: 1,
      } as PedestrianParams),
    )
  }

  addPredator = (loc?: number[]) => {
    this.predators.push(
      new Predator({
        x: loc ? loc[0] : undefined,
        y: loc ? loc[1] : undefined,
        crowd: this,
        grid: this.grid,
        images: this.images,
        movementSpeed: 1,
      } as PredatorParams),
    )
  }
}
