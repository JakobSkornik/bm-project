import p5Types from 'p5'

import { P5Component } from '..'
import { Assets } from '../../types/Assets'
import { getRandomInt } from '../hooks/getRandomInt'
import Grid from '../static/grid'
import Pedestrian from './pedestrian'

export default class Crowd extends P5Component {
  assets: Assets
  numOfPedestrians = 1000
  pedestrians: Pedestrian[] = []
  grid: Grid

  constructor(assets: Assets, grid: Grid) {
    super()
    this.assets = assets
    this.grid = grid

    for (let i = 0; i < this.numOfPedestrians; i++) {
      this.pedestrians.push(new Pedestrian(this.assets, this.grid, getRandomInt(5, 1)))
    }
  }

  show = (p5: p5Types) => {
    for (let i = 0; i < this.pedestrians.length; i++) {
      this.pedestrians[i].show(p5)
    }
    this.move()
  }

  move = () => {
    for (let i = 0; i < this.pedestrians.length; i++) {
      this.pedestrians[i].move()
    }
  }
}
