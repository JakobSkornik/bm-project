import p5Types from 'p5'

import Crowd from './crowd'
import Grid from '../static/grid'
import P5Component from '..'
import { getRandomInt } from '../hooks/getRandomInt'
import { getRandomChoice } from '../hooks/getRandomChoice'
import { getDistance } from '../hooks/getDistance'
import { State } from '../../store'
import { Images } from '../../types'

export type PedestrianParams = {
  grid: Grid
  images: Images
  movementSpeed: number
  x?: number
  y?: number
  neighbourhoodRadius?: number
}

export default class Pedestrian extends P5Component {
  grid: Grid
  images: Images
  movementSpeed: number
  velocity: number[]
  destination: number[] = []
  neighbours: Pedestrian[] = []
  x: number = 0
  y: number = 0

  // TODO MAKE THESE CONTEXT VARIABLES WITH BUTTONS IN CTRL PANEL
  neighbourhoodRadius: number = 50
  playbackSpeed: number = 0.2

  constructor(params: PedestrianParams) {
    super()
    this.grid = params.grid
    this.images = params.images
    this.movementSpeed = params.movementSpeed ?? 1

    if (this.valid(params)) {
      this.setRandomStartLocation()
    } else {
      this.x = params.x!
      this.y = params.y!
      this.destination = this.getRandomDestination()
    }

    this.velocity = this.getVelocity()
  }

  show = (p5: p5Types, state?: State) => {
    p5.image(
      this.images['man'],
      Math.round(this.x) - 20,
      Math.round(this.y) - 33,
      50,
      50,
    )

    p5.noStroke()
    p5.fill(0, 0, 0, 50)
    p5.ellipse(this.x, this.y, 20, 5)

    if (state) {
      // Show destination
      if (state.showDestination) {
        p5.fill(0)
        p5.circle(this.destination[0], this.destination[1], 10)

        p5.strokeWeight(1)
        p5.stroke(100)

        p5.line(this.x, this.y, this.destination[0], this.destination[1])
      }

      // Show neighbourhood radius
      if (state.showNeighbourhood) {
        p5.noStroke()
        p5.fill(200, 100, 100, 50)
        p5.circle(this.x, this.y, this.neighbourhoodRadius * 2)
      }

      // Show velocity
      if (state.showVelocity) {
        p5.strokeWeight(1)
        p5.stroke(100)
        p5.line(
          this.x,
          this.y,
          this.x + this.velocity[0] * 50,
          this.y + this.velocity[1] * 50,
        )
        p5.noStroke()
        p5.fill(100)
        p5.circle(
          this.x + this.velocity[0] * 50,
          this.y + this.velocity[1] * 50,
          3,
        )
      }
    }
  }

  move = () => {
    this.velocity = this.getVelocity()
    for (let i = 0; i < this.movementSpeed; i++) {
      this.x += this.velocity[0] * this.playbackSpeed
      this.y += this.velocity[1] * this.playbackSpeed

      if (this.respawn()) {
        this.setRandomStartLocation()
      }
    }
  }

  valid = (params: PedestrianParams) => {
    return (
      params.x == null ||
      params.y == null ||
      params.x < 0 ||
      params.x > this.grid.w ||
      params.y < 0 ||
      params.y > this.grid.h
    )
  }

  respawn = () => {
    return (
      Math.round(this.x) == this.destination[0] &&
      Math.round(this.y) == this.destination[1]
    )
  }

  setRandomStartLocation = () => {
    this.x = getRandomChoice([0, this.grid.w])
    this.y = getRandomInt(this.grid.h)

    this.destination = [this.grid.w - this.x, getRandomInt(this.grid.h)]
  }

  getRandomDestination = () => {
    const x = getRandomChoice([0, this.grid.w])
    const y = getRandomInt(this.grid.h)
    return [x, y]
  }

  getVelocity = () => {
    // BASE VELOCITY
    const x1 = this.x
    const y1 = this.y
    const x2 = this.destination[0]
    const y2 = this.destination[1]

    const dx = x2 - x1
    const dy = y2 - y1
    const nFactor = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    const base = [dx / nFactor, dy / nFactor]

    // SEPARATION VELOCITY
    if (this.neighbours.length > 0) {
      const sFactor = 0.5
      let [sx, sy, n] = [0, 0, 0]
      for (let i = 0; i < this.neighbours.length; i++) {
        sx += this.neighbours[i].x - this.x
        sy += this.neighbours[i].y - this.y
        n++
      }
      let sf = Math.sqrt(Math.pow(sx, 2) + Math.pow(sy, 2))
      sx /= n * sf
      sy /= n * sf
      return [base[0] - sx * sFactor, base[1] - sy * sFactor]
    } else {
      return base
    }
  }

  getNeighbours = (crowd: Crowd) => {
    this.neighbours = []
    for (let i = 0; i < crowd.numOfPedestrians; i++) {
      const d = getDistance(
        this.x,
        this.y,
        crowd.pedestrians[i].x,
        crowd.pedestrians[i].y,
      )
      if (d <= this.neighbourhoodRadius && d > 0) {
        this.neighbours.push(crowd.pedestrians[i])
      }
    }
  }
}
