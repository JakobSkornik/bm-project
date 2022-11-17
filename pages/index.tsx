import dynamic from 'next/dynamic'
import p5Types from 'p5'
import { memo, useCallback, useEffect, useState } from 'react'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

import Background from '../components/Background'
import ControlPanel from '../components/ControlPanel'
import { AppConfig } from '../types'
import { Assets } from '../types/Assets'
import { Components } from '../types/Components'
import Crowd, { CrowdParams } from '../elements/actors/crowd'
import Grid, { GridParams } from '../elements/static/grid'
import P5Background, { BackgroundParams } from '../elements/static/p5background'
import { useControlPanelContext } from '../context'
import FPSCounter from '../elements/ui/fpsCounter'
import PedestrianCounter from '../elements/ui/pedestrianCounter'

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
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [font, setFont] = useState<p5Types.Font>()
  const [components, setComponents] = useState<Components>({})
  const {
    clear,
    addNumber,
    pause,
    showDestination,
    showNeighbourhood,
    onClear,
  } = useControlPanelContext()
  let assets = {} as Assets
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Helper method to load assets
  const loadAssets = (p5: p5Types) => {
    let components = {} as Components

    // Load static assets like images in a dict
    for (let i = 0; i < images.length; i++) {
      assets[images[i]] = p5.loadImage(`icons/${images[i]}.svg`)
    }

    // Initialize dynamic components
    components['background'] = new P5Background({
      assets: assets,
    } as BackgroundParams)

    components['grid'] = new Grid({
      assets: assets,
      w: dims.w,
      h: dims.h,
    } as GridParams)

    components['crowd'] = new Crowd({
      assets: assets,
      numOfPedestrians: 1,
      grid: components['grid'],
    } as CrowdParams)

    components['fps'] = new FPSCounter({
      assets: assets,
      x: p5.width - 65,
      y: 5,
    })

    components['n-counter'] = new PedestrianCounter({
      assets: assets,
      x: p5.width - 60,
      y: 30,
    })

    setComponents(components)
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
    if (p5.width == window.innerWidth && p5.height == window.innerHeight) {
      return
    }
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
    ;(components['grid'] as Grid).resize(p5)
  }

  // Called in render loop
  const draw = (p5: p5Types) => {
    if (clear) {
      components['background'].show(p5)
      loadAssets(p5)
      onClear()
    }

    let appConfig = {
      destination: showDestination,
      neighbourhood: showNeighbourhood,
      numOfPedestrians: (components['crowd'] as Crowd).numOfPedestrians,
    } as AppConfig

    if (pause) {
      components['fps'].show(p5)
      components['n-counter'].show(p5, appConfig)
      return
    }

    components['background'].show(p5)
    components['grid'].show(p5)
    components['crowd'].show(p5, appConfig)
    components['fps'].show(p5)
    components['n-counter'].show(p5, appConfig)
  }

  // Triggers on button press
  const onKeyPressed = (p5: p5Types) => {
    const mouseX = p5.mouseX
    const mouseY = p5.mouseY

    if (p5.key == ' ') {
      for (let i = 0; i < addNumber; i++) {
        ;(components['crowd'] as Crowd).addPedestrian(mouseX, mouseY)
      }
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
