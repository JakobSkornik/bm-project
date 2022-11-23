import dynamic from 'next/dynamic'
import p5Types from 'p5'
import { memo, useCallback, useEffect, useState } from 'react'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

import Background from '../components/Background'
import ControlPanel from '../components/ControlPanel'
import Metrics from '../elements/ui/metrics'
import P5Background from '../elements/static/p5background'
import Crowd from '../elements/actors/crowd'
import Grid, { GridParams } from '../elements/static/grid'
import { Components, Images } from '../types'
import { useGlobalContext } from '../context'

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
  canvas: {
    position: 'fixed' as 'fixed',
    width: '100vw',
    height: '100vh',
  },
}

// Static assets to load
const imgToLoad = [
  'humanm',
  'humanf',
  'buffalom',
  'buffalof',
  'antm',
  'antf',
  'fishm',
  'fishf',
  'birdm',
  'birdf',
]

const Index = () => {
  const { state, actions } = useGlobalContext()
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [font, setFont] = useState<p5Types.Font>()

  const handleResize = useCallback(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight })
  }, [])

  // Retrieve viewport dims after initial render
  useEffect(() => {
    setDims({
      w: window.innerWidth,
      h: window.innerHeight,
    })
    window.addEventListener('resize', handleResize, false)
  }, [handleResize])

  // Helper method to load assets
  const loadAssets = (p5: p5Types) => {
    let components = {} as Components
    let images = {} as Images

    // Load static assets like images in a dict
    for (let i = 0; i < imgToLoad.length; i++) {
      images[imgToLoad[i]] = p5.loadImage(`icons/${imgToLoad[i]}.svg`)
    }

    // Initialize dynamic components
    components['background'] = new P5Background()

    components['grid'] = new Grid({
      w: dims.w,
      h: dims.h,
    })

    components['crowd'] = new Crowd({
      images: images,
      numOfPedestrians: state.numOfPedestrians,
      grid: components['grid'] as Grid,
    })

    components['metrics'] = new Metrics()

    actions('components', components)
    actions('images', images)
  }

  // Preload required assets, fonts etc.
  const preload = (p5: p5Types) => {
    setFont(p5.loadFont('Font.ttf'))
  }

  // Perform initial setup
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(dims.w, dims.h).parent(canvasParentRef)
    p5.textFont(font!)
    p5.frameRate(80)
    loadAssets(p5)
  }

  // Triggers on resize
  const onResize = (p5: p5Types) => {
    if (p5.width == window.innerWidth && p5.height == window.innerHeight) {
      return
    }
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
    ;(state.components['grid'] as Grid).resize(p5)
  }

  // Called in render loop
  const draw = (p5: p5Types) => {
    if (state.clear) {
      state.components['background'].show(p5)
      loadAssets(p5)
      actions('clear', false)
      actions('numOfPedestrians', 1)
    }

    if (state.pause) {
      state.components['metrics'].show(p5, state)
      return
    }

    if (state.decreaseSpeed) {
      actions('decreaseSpeed', false)
    }

    if (state.increaseSpeed) {
      actions('increaseSpeed', false)
    }

    state.components['background'].show(p5)
    state.components['grid'].show(p5)
    state.components['crowd'].show(p5, state)
    state.components['metrics'].show(p5, state)
  }

  // Triggers on button press
  const onKeyPressed = (p5: p5Types) => {
    if (p5.key == ' ') {
      actions(
        'numOfPedestrians',
        (state.components['crowd'].pedestrians.length +
          state.pedestriansToAdd) as Crowd,
      )
    }
    return
  }

  // Triggers on button press
  const onClick = (p5: p5Types) => {
    const mouseX = p5.mouseX
    const mouseY = p5.mouseY

    // if (p5.mouseButton == 'left') {
    //   ;(components['crowd'] as Crowd).addPedestrian(mouseX, mouseY)
    // }
    return
  }

  return (
    <div style={sx.container}>
      <Background />
      {dims.w && dims.h && (
        <div style={sx.canvas}>
          <Sketch
            preload={preload}
            setup={setup}
            windowResized={onResize}
            keyTyped={onKeyPressed}
            mouseClicked={onClick}
            draw={draw}
          />
        </div>
      )}
      <ControlPanel />
    </div>
  )
}

export default memo(Index)
