import p5Types from 'p5'

import Crowd from './crowd'
import Grid from '../static/grid'
import P5Component from '..'
import { getRandomInt } from '../hooks/getRandomInt'
import { getRandomChoice } from '../hooks/getRandomChoice'
import { getDistance } from '../hooks/getDistance'
import { State } from '../../types'
import { clamp } from '../hooks/clamp'

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
  velocity: number[]
  destination: number[] = []
  x: number = 0
  y: number = 0
  gender: string = 'man'
  biasPoint: number[] = []
  turnFactor: number = 0.2
  margin: number[] = []
  hasBias: boolean = false

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

    if (getRandomInt(100, 0) < 5) {
      this.hasBias = true
    }

    if (getRandomInt(3, 1) > 1) {
      this.gender = 'woman'
    }
  }

  show = (p5: p5Types, state: State) => {
    const mW = p5.width / 20
    const mH = p5.height / 20
    this.margin = [mW, p5.width - mW, mH, p5.height - mH]

    p5.image(
      state!.images[this.gender],
      Math.round(this.x) - 20,
      Math.round(this.y) - 33,
      50,
      50,
    )

    // Shadow
    p5.noStroke()
    p5.fill(0, 0, 0, 50)
    p5.ellipse(this.x, this.y, 20, 5)

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
      p5.circle(this.x, this.y, state.protectedRange * 2)
    }

    // Show protectedRange radius
    if (state.showPreferredRange) {
      p5.noStroke()
      p5.fill(100, 200, 100, 50)
      p5.circle(this.x, this.y, state.preferredRange * 2)
    }

    // Show biasp
    // p5.noStroke()
    // p5.fill(100, 100, 200)
    // p5.circle(this.biasPoint[0], this.biasPoint[1], 10)

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
      // p5.noStroke()
      // p5.fill(100)
      // p5.circle(
      //   this.x + this.velocity[0] * 50,
      //   this.y + this.velocity[1] * 50,
      //   3,
      // )
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
    if (!state) {
      return [0, 0]
    }

    const inProtected = this.getInProtectedRange(state.protectedRange)
    const inPreferred = this.getInPreferredRange(state.preferredRange)

    // BASE VELOCITY
    let base: number[]

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

      base = this.velocity
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

    let alignment = state.alignment
      ? this.getAlignmentVelocity(inPreferred)
      : [0, 0]
    let cohesion = state.cohesion
      ? this.getCohesionVelocity(inPreferred)
      : [0, 0]
    let separation = state.separation
      ? this.getSeparationVelocity(inProtected, state.protectedRange)
      : [0, 0]
    let bias = state.bias ? this.getBiasVelocity() : [0, 0]

    return [
      clamp(
        base[0] +
          bias[0] * state.biasFactor +
          alignment[0] * state.alignmentFactor -
          separation[0] * state.separationFactor +
          cohesion[0] * state.cohesionFactor,
        -1.3,
        1.3,
      ),
      clamp(
        base[1] +
          bias[1] * state.biasFactor +
          alignment[1] * state.alignmentFactor -
          separation[1] * state.separationFactor +
          cohesion[1] * state.cohesionFactor,
        -1.3,
        1.3,
      ),
    ]
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

  getAlignmentVelocity = (inPreferred: Pedestrian[]) => {
    if (!inPreferred.length) {
      return [0, 0]
    }
    let [vx, vy, n] = [0, 0, 0]
    for (let i = 0; i < inPreferred.length; i++) {
      vx += inPreferred[i].velocity[0]
      vy += inPreferred[i].velocity[1]
      n++
    }

    vx /= n
    vy /= n
    const d = Math.sqrt(vx * vx + vy * vy)
    if (!n || !d) {
      return [0, 0]
    }

    return [vx / d, vy / d]
  }

  getSeparationVelocity = (inProtected: Pedestrian[], range: number) => {
    if (!inProtected.length) {
      return [0, 0]
    }

    let [sx, sy, n] = [0, 0, 0]
    for (let i = 0; i < inProtected.length; i++) {
      sx += inProtected[i].x - this.x
      sy += inProtected[i].y - this.y
      // const d = getDistance(this.x, this.y, inProtected[i].x, inProtected[i].y)
      // sx = sx * (1 - d / range)
      // sx = sy * (1 - d / range)
      n++
    }
    let sf = Math.sqrt(sx * sx + sy * sy)
    sx /= n * sf
    sy /= n * sf
    return [sx, sy]
  }

  getCohesionVelocity = (inPreferred: Pedestrian[]) => {
    if (!inPreferred.length) {
      return [0, 0]
    }

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

    return [dx / d, dy / d]
  }

  getBiasVelocity = () => {
    if (!this.hasBias || !this.velocity[0] || !this.velocity[1]) {
      return [0, 0]
    }

    if (!this.biasPoint.length) {
      this.biasPoint = this.getRandomPointInCanvas()
    }

    // Set new biaspoint on finish
    let d = getDistance(this.x, this.y, this.biasPoint[0], this.biasPoint[1])
    if (d < 6) {
      this.biasPoint = this.getRandomPointInCanvas()
    }

    let bf = Math.sqrt(
      Math.pow(this.biasPoint[0], 2) + Math.pow(this.biasPoint[1], 2),
    )
    const dx =  this.velocity[0] - this.biasPoint[0] / bf
    const dy = this.velocity[1] - this.biasPoint[1] / bf
    let df = Math.sqrt(dx * dx + dy * dy)
    
    // Normalize bias direction
    return [dx / df, dy / df]
  }

  getInProtectedRange = (range: number) => {
    if (!this.velocity) {
      return []
    }
    let inProtected: Pedestrian[] = []
    let preferred: Pedestrian[] = []
    for (let i = 0; i < this.crowd.pedestrians.length; i++) {
      const d = getDistance(
        this.x,
        this.y,
        this.crowd.pedestrians[i].x,
        this.crowd.pedestrians[i].y,
      )
      if (d <= range && d > 0) {
        inProtected.push(this.crowd.pedestrians[i])
      }
    }
    return inProtected

    // Filter people going wrong way
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

  getInPreferredRange = (range: number) => {
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
      if (d <= range && d > 0) {
        inVisual.push(this.crowd.pedestrians[i])
      }
    }
    return inVisual

    // Filter people going wrong way
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
