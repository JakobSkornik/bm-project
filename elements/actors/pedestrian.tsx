import p5Types from 'p5'

import Crowd from './crowd'
import Grid from '../static/grid'
import P5Component from '..'
import { getRandomInt } from '../hooks/getRandomInt'
import { getRandomChoice } from '../hooks/getRandomChoice'
import { getDistance } from '../hooks/getDistance'
import { Images, State } from '../../types'

export type PedestrianParams = {
  crowd: Crowd
  grid: Grid
  movementSpeed: number
  x?: number
  y?: number
  protectedRangeRadius?: number
}

export default class Pedestrian extends P5Component {
  crowd: Crowd
  grid: Grid
  movementSpeed: number
  playbackSpeed: number = 0.2
  velocity: number[]
  destination: number[] = []
  x: number = 0
  y: number = 0
  gender: string = 'man'

  // TODO MAKE THESE CONTEXT VARIABLES WITH BUTTONS IN CTRL PANEL
  protectedRangeRadius: number = 50
  visualRangeRadius: number = 80
  alignmentFactor: number = 1
  separationFactor: number = 0.6
  cohesionFactor: number = 0.1

  constructor(params: PedestrianParams) {
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

    if (getRandomInt(3, 1) > 1) {
      this.gender = 'woman'
    }
  }

  show = (p5: p5Types, state: State) => {
    p5.image(
      state!.images[this.gender],
      Math.round(this.x) - 20,
      Math.round(this.y) - 33,
      50,
      50,
    )

    p5.noStroke()
    p5.fill(0, 0, 0, 50)
    p5.ellipse(this.x, this.y, 20, 5)

    this.playbackSpeed = state.playbackSpeed

    // Show destination
    if (state.showDestination) {
      p5.fill(0)
      p5.circle(this.destination[0], this.destination[1], 10)

      p5.strokeWeight(1)
      p5.stroke(100)

      p5.line(this.x, this.y, this.destination[0], this.destination[1])
    }

    // Show protectedRange radius
    if (state.showProtectedRange) {
      p5.noStroke()
      p5.fill(200, 100, 100, 50)
      p5.circle(this.x, this.y, this.protectedRangeRadius * 2)
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
    const inProtected = this.getInProtectedRange()
    const inPreferred = this.getInPreferredRange()

    // BASE VELOCITY
    const x1 = this.x
    const y1 = this.y
    const x2 = this.destination[0]
    const y2 = this.destination[1]

    const dx = x2 - x1
    const dy = y2 - y1
    const nFactor = Math.sqrt(dx * dx + dy * dy)

    const base = [dx / nFactor, dy / nFactor]
    let separation = [0, 0]
    let alignment = [0, 0]
    let cohesion = [0, 0]

    // SEPARATION VELOCITY
    if (inProtected.length > 0) {
      let [sx, sy, n] = [0, 0, 0]
      for (let i = 0; i < inProtected.length; i++) {
        sx += inProtected[i].x - this.x
        sy += inProtected[i].y - this.y
        const d = getDistance(
          this.x,
          this.y,
          inProtected[i].x,
          inProtected[i].y,
        )
        sx = sx * (1 - d / this.protectedRangeRadius)
        sx = sy * (1 - d / this.protectedRangeRadius)
        n++
      }
      let sf = Math.sqrt(sx * sx + sy * sy)
      sx /= n * sf
      sy /= n * sf
      separation = [sx, sy]
    }

    // COHESION VELOCITY
    if (inPreferred.length > 0) {
      let [cx, cy, n] = [0, 0, 0]
      for (let i = 0; i < inPreferred.length; i++) {
        cx += inPreferred[i].x
        cy += inPreferred[i].y
        n++
      }
      cx /= n
      cy /= n

      const dx = cx - this.x
      const dy = cy - this.y
      let d = Math.sqrt(dx * dx + dy * dy)

      cohesion = [dx / d, dy / d]
    }
    return [
      base[0] +
        alignment[0] * this.alignmentFactor -
        separation[0] * this.separationFactor +
        cohesion[0] * this.cohesionFactor,
      base[1] +
        alignment[1] * this.alignmentFactor -
        separation[1] * this.separationFactor +
        cohesion[1] * this.cohesionFactor,
    ]
  }

  getInProtectedRange = () => {
    if (!this.velocity) {
      return []
    }
    let inProtected: Pedestrian[] = []

    for (let i = 0; i < this.crowd.pedestrians.length; i++) {
      const d = getDistance(
        this.x,
        this.y,
        this.crowd.pedestrians[i].x,
        this.crowd.pedestrians[i].y,
      )
      if (d <= this.protectedRangeRadius && d > 0) {
        inProtected.push(this.crowd.pedestrians[i])
      }
    }
    return inProtected

    // // Filter people going wrong way
    // for (let i = 0; i < inProtected.length; i++) {
    //   if (this.velocity.length && inProtected[i].velocity.length) {
    //     const firstAngle = Math.atan2(this.velocity[1], this.velocity[0])
    //     const secondAngle = Math.atan2(inProtected[i].y, inProtected[i].x)
    //     const angle = secondAngle - firstAngle
    //     if (Math.abs((angle * 180) / Math.PI) < 40) {
    //       preferred.push(inProtected[i])
    //     }
    //   }
    // }

    // return preferred
  }

  getInPreferredRange = () => {
    if (!this.velocity) {
      return []
    }
    let inVisual: Pedestrian[] = []
    let preferred: Pedestrian[] = []
    for (let i = 0; i < this.crowd.pedestrians.length; i++) {
      const d = getDistance(
        this.x,
        this.y,
        this.crowd.pedestrians[i].x,
        this.crowd.pedestrians[i].y,
      )
      if (d <= this.visualRangeRadius && d > 0) {
        inVisual.push(this.crowd.pedestrians[i])
      }
    }
    return inVisual

    // // Filter people going wrong way
    // for (let i = 0; i < inVisual.length; i++) {
    //   if (this.velocity.length && inVisual[i].velocity.length) {
    //     const firstAngle = Math.atan2(this.velocity[1], this.velocity[0])
    //     const secondAngle = Math.atan2(
    //       inVisual[i].velocity[1],
    //       inVisual[i].velocity[0],
    //     )
    //     const angle = secondAngle - firstAngle
    //     if (Math.abs((angle * 180) / Math.PI) < 45) {
    //       preferred.push(inVisual[i])
    //     }
    //   }
    // }

    // return preferred
  }
}
