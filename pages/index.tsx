import useResizeObserver from '@react-hook/resize-observer'
import dynamic from 'next/dynamic'
import p5Types from 'p5'
import { createRef, useEffect, useState } from 'react'
import Crowd from '../components/actors/crowd'
import Background from '../components/static/background'
import Grid from '../components/static/grid'
import { Assets } from '../types/Assets'
import { Components } from '../types/Components'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

/**
 * Main component responsible for
 * serving p5.js canvas.
 */

const sx = {
  container: {
    position: 'fixed' as 'fixed',
    width: '100vw',
    height: '100vh',
  },
}

const images = [
  'block',
  'bridge',
  'cityhouse',
  'house',
  'house2',
  'man',
  'sidewalk',
  'woman',
]

const Index = () => {
  // State
  const [font, setFont] = useState<p5Types.Font | null>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const parentRef = createRef<HTMLDivElement>()
  let assets = {} as Assets
  let components = {} as Components

  // Retrieve viewport dims after initial render
  useEffect(() => {
    if (!parentRef.current) {
      return
    }

    setDims({
      w: parentRef.current.offsetWidth,
      h: parentRef.current.offsetHeight,
    })
  }, [])

  const loadAssets = (p5: p5Types) => {
    for (let i = 0; i < images.length; i++) {
      assets[images[i]] = p5.loadImage(`icons/${images[i]}.svg`)
    }

    components['background'] = new Background(assets)
    components['grid'] = new Grid(dims.w, dims.h, [0, 0, dims.w, 0.44 * dims.w])
    components['crowd'] = new Crowd(assets, components['grid'] as Grid)
  }

  // Preload required assets, fonts etc.
  const preload = (p5: p5Types) => {
    setFont(p5.loadFont('Font.ttf'))
  }

  // Perform initial setup
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(dims.w, dims.h).parent(canvasParentRef)
    p5.textFont(font!)
    
    loadAssets(p5)
  }

  // Triggers on resize
  const onResize = (p5: p5Types) => {
    if (p5.width == dims.w && p5.height == dims.h) {
      return
    }
    p5.resizeCanvas(dims.w, dims.h)
  }

  // Called in render loop
  const draw = (p5: p5Types) => {
    components['background'].show(p5)
    components['grid'].show(p5)
    components['crowd'].show(p5)
  }

  // Triggers on click
  const onClick = (p5: p5Types) => {
    const mouseX = p5.mouseX
    const mouseY = p5.mouseY

    // Use mouseX, mouseY here
  }

  return (
    <div ref={parentRef} style={sx.container}>
      {dims.w && dims.h &&<Sketch
        preload={preload}
        setup={setup}
        windowResized={onResize}
        mouseClicked={onClick}
        draw={draw}
      />}
    </div>
  )
}

export default Index
