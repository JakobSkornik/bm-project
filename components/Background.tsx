import { memo } from "react"

const sx = {
  bg: {
    position: 'fixed' as 'fixed',
    width: '100vw',
    height: '100vh',
    background:
      'radial-gradient(circle, rgba(244,240,232,1) 0%, rgba(196,196,196,1) 59%, rgba(169,163,157,1) 100%)',
  },
}

const Background = () => {
  return <div style={sx.bg}></div>
}

export default memo(Background)
