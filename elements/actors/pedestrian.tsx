import p5Types from 'p5'

import Grid from '../static/grid'
import P5Component, { P5ComponentParams } from '..'
import { getRandomInt } from '../hooks/getRandomInt'
import { getRandomChoice } from '../hooks/getRandomChoice'
import { AppConfig } from '../../types'

export type PedestrianParams = P5ComponentParams & {
  grid: Grid
  movementSpeed: number
  x?: number
  y?: number
  neighbourhoodRadius?: number
}

export default class Pedestrian extends P5Component {
  grid: Grid
  movementSpeed: number
  velocity: number[]
  destination: number[] = []
  x: number = 0
  y: number = 0
  neighbourhoodRadius: number = 200

  constructor(params: PedestrianParams) {
    super(params as P5ComponentParams)
    this.grid = params.grid
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

  show = (p5: p5Types, appConfig?: AppConfig) => {
    p5.image(
      this.assets['man'],
      Math.round(this.x) - 20,
      Math.round(this.y) - 33,
      50,
      50,
    )

    p5.noStroke()
    p5.fill(0, 0, 0, 50)
    p5.ellipse(this.x, this.y, 20, 5)

    if (appConfig) {

      // Show destination
      if (appConfig.destination) {
        p5.fill(0)
        p5.circle(this.destination[0], this.destination[1], 10)

        p5.strokeWeight(1)
        p5.stroke(100)

        p5.line(this.x, this.y, this.destination[0], this.destination[1])
      }

      // Show neighbourhood radius
      if (appConfig.neighbourhood) {
        p5.noStroke()
        p5.fill(200, 100, 100, 50)
        p5.circle(this.x, this.y, this.neighbourhoodRadius)
      }
    }
  }

  move = () => {
    for (let i = 0; i < this.movementSpeed; i++) {
      let [x, y] = [this.x, this.y]
      this.x += this.velocity[0]
      this.y += this.velocity[1]

      if (this.respawn()) {
        this.setRandomStartLocation()
      }
      this.velocity = this.getVelocity()
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
    const x1 = this.x
    const y1 = this.y
    const x2 = this.destination[0]
    const y2 = this.destination[1]

    const dx = x2 - x1
    const dy = y2 - y1
    const normFactor = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

    return [dx / normFactor, dy / normFactor]
  }
}
