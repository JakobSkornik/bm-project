import p5Types from 'p5'

import Grid from '../static/grid'
import { P5Component } from '..'
import { Assets } from '../../types/Assets'
import { getRandomInt } from '../hooks/getRandomInt'

export default class Pedestrian extends P5Component {
  assets: Assets
  x: number
  y: number
  grid: Grid
  color: number[]
  movementSpeed: number

  constructor(assets: Assets, grid: Grid, movementSpeed: number) {
    super()
    const rnd = Math.floor(Math.random() * (grid.tiles.length - 100)) + 100
    this.y = rnd < 100 ? 200 : rnd
    this.x = Math.floor(Math.random() * grid.tiles[this.y].length)
    this.assets = assets
    this.grid = grid
    this.movementSpeed = movementSpeed ?? 1
    this.color = [getRandomInt(255), getRandomInt(255), getRandomInt(255), getRandomInt(255)]
  }

  show = (p5: p5Types) => {
    p5.image(this.assets['man'], this.x, this.y, 50, 50)
    p5.noStroke()
    p5.fill(0, 0, 0, 50)
    p5.ellipse(this.x + 20, this.y + 33, 20, 5)
  }

  

  move = () => {
    const moveIdx = getRandomInt(3)
    let [x, y] = [this.x, this.y]
    switch (moveIdx) {
      case 0:
        x += this.movementSpeed
        break
      case 1:
        y += this.movementSpeed
        break
      case 2:
        x += this.movementSpeed
        break
      case 3:
        x -= this.movementSpeed
        break
    }

    if (
      y > 0 &&
      x > 0 &&
      this.grid.tiles.length &&
      y < this.grid.tiles.length &&
      this.grid.tiles[y].length &&
      this.grid.tiles[y][x] != null
    ) {
      this.x = x
      this.y = y
    }
  }
}
