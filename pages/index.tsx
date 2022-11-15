import dynamic from 'next/dynamic'
import p5Types from 'p5'
import { createRef, useState } from 'react'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

const Index = () => {
  const [font, setFont] = useState<p5Types.Font | null>(null)
  const parentRef = createRef<HTMLDivElement>()
  const preload = (p5: p5Types) => {
    setFont(p5.loadFont('Font.ttf'))
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(1600, 1080).parent(canvasParentRef)
    p5.textFont(font!)
  }

  const draw = (p5: p5Types) => {
    p5.background(200, 200, 100)
  }

  const onClick = (p5: p5Types) => {}

  return (
    <div ref={parentRef}>
      <Sketch
        preload={preload}
        setup={setup}
        mouseClicked={onClick}
        draw={draw}
      />
    </div>
  )
}

export default Index
