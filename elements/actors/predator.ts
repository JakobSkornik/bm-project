import p5Types from 'p5'

import Crowd from './crowd'
import Grid from '../static/grid'
import P5Component from '..'
import { getRandomInt } from '../hooks/getRandomInt'
import { getRandomChoice } from '../hooks/getRandomChoice'
import { getDistance } from '../hooks/getDistance'
import { State } from '../../types'

export type PredatorParams = {
  crowd: Crowd
  grid: Grid
  movementSpeed: number
  x?: number
  y?: number
  protectedRangeRadius?: number
}

export default class Predator extends P5Component {
  crowd: Crowd
  grid: Grid
  movementSpeed: number
  velocity: number[] = [0, 0]
  destination: number[] = []
  x: number = 0
  y: number = 0
  turnFactor: number = 0.2
  margin: number[] = []

  constructor(params: PredatorParams) {
    super()
    this.crowd = params.crowd
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

  show = (p5: p5Types, state: State) => {
    if (!state || !state.images || !state.icon) {
      return
    }

    const mW = p5.width / 20
    const mH = p5.height / 20
    this.margin = [mW, p5.width - mW, mH, p5.height - mH]

    this.drawEntity(p5, state)

    // Show destination
    if (state.showDestination) {
      p5.fill(0)
      p5.circle(this.destination[0], this.destination[1], 10)

      p5.strokeWeight(1)
      p5.stroke(100)

      p5.line(this.x, this.y, this.destination[0], this.destination[1])
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
    }
  }

  move = (state: State) => {
    this.velocity = this.getVelocity(state)
    for (let i = 0; i < this.movementSpeed; i++) {
      this.x += this.velocity[0] * state.playbackSpeed
      this.y += this.velocity[1] * state.playbackSpeed

      if (this.respawn()) {
        this.setRandomStartLocation()
      }
    }
  }

  getVelocity = (state?: State) => {
    let base: number[] = [0, 0]

    if (!state) {
      return base
    }

    // BASE VELOCITY
    // Bounds determine whether grid is closed
    if (!state.bounds) {
      const x1 = this.x
      const y1 = this.y
      const x2 = this.destination[0]
      const y2 = this.destination[1]

      const dx = x2 - x1
      const dy = y2 - y1
      const nFactor = Math.sqrt(dx * dx + dy * dy)
      base = [dx / nFactor, dy / nFactor]
    }
    // Add turn when over bounds in bound mode
    else {
      // Sanity check that velocity exists
      if (!this.velocity[0] || !this.velocity[1]) {
        this.velocity = this.getRandomVelocity()
      }

      base = [...this.velocity]
      if (this.x < this.margin[0]) {
        base[0] += this.turnFactor
      }
      if (this.x > this.margin[1]) {
        base[0] -= this.turnFactor
      }
      if (this.y < this.margin[2]) {
        base[1] += this.turnFactor
      }
      if (this.y > this.margin[3]) {
        base[1] -= this.turnFactor
      }
    }

    let baseNorm = Math.sqrt(base[0] * base[0] + base[1] * base[1])
    return [base[0] / baseNorm, base[1] / baseNorm]
  }

  valid = (params: PredatorParams) => {
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
      getDistance(this.x, this.y, this.destination[0], this.destination[1]) < 5
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

  getRandomPointInCanvas = () => {
    return [
      getRandomInt(this.margin[1] - 10, this.margin[0] + 10),
      getRandomInt(this.margin[3] - 10, this.margin[2] + 10),
    ]
  }

  getRandomVelocity = () => {
    let base = this.getRandomPointInCanvas()
    let nFactor = Math.sqrt(base[0] * base[0] + base[1] * base[1])
    return [base[0] / nFactor, base[1] / nFactor]
  }

  drawEntity = (p5: p5Types, state: State) => {
    if (state.icon == 'human') {
      p5.image(
        state.images[state.icon + 'p'],
        Math.round(this.x) - 30,
        Math.round(this.y) - 40,
        80,
        80,
      )

      p5.noStroke()
      p5.fill(0, 0, 0, 50)
      p5.ellipse(this.x, this.y, 20, 5)
      return
    }
    if (state.icon == 'buffalo') {
      p5.image(
        state.images[state.icon + 'p'],
        Math.round(this.x) - 30,
        Math.round(this.y) - 45,
        100,
        100,
      )

      p5.noStroke()
      p5.fill(0, 0, 0, 50)
      p5.ellipse(this.x, this.y, 40, 10)
      return
    }

    if (state.icon == 'ant') {
      p5.image(
        state.images[state.icon + 'p'],
        Math.round(this.x) - 30,
        Math.round(this.y) - 45,
        90,
        90,
      )

      p5.noStroke()
      p5.fill(0, 0, 0, 50)
      p5.ellipse(-15, 0, 40, 20)
      return
    }

    if (state.icon == 'fish') {
      p5.image(
        state.images[state.icon + 'p'],
        Math.round(this.x) - 30,
        Math.round(this.y) - 45,
        150,
        150,
      )
      return
    }

    if (state.icon == 'bird') {
      p5.image(
        state.images[state.icon + 'p'],
        Math.round(this.x) - 30,
        Math.round(this.y) - 45,
        90,
        90,
      )
      return
    }
  }
}
