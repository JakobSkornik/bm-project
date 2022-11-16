import { memo } from "react"

const sx = {
  bg: {
    position: 'fixed' as 'fixed',
    width: '100vw',
    height: '100vh',
    background:
      'radial-gradient(circle, rgba(235,235,235,1) 0%, rgba(196,196,196,1) 59%, rgba(163,163,163,1) 100%)',
  },
}

const Background = () => {
  return <div style={sx.bg}></div>
}

export default memo(Background)
