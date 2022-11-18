import { memo, useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import Button from './Button'

const sx = {
  ctrlPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed' as 'fixed',
    alignItems: 'center',
    backgroundColor: 'darkgray',
    backdropFilter: 'blur(3px)',
    borderRadius: '30vh',
    padding: '5px',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px darkgray`,
  },
  btn: {
    width: '6vh',
    height: '6vh',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: '40%',
    transition: 'all 0.1s ease-in-out',
  },
  btnActive: {
    width: '6vh',
    height: '6vh',
    backgroundColor: 'rgba(100, 100, 100, .4)',
    borderColor: 'rgba(0, 0, 0, 0)',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.5), 0 0 4px 4px rgba(0, 0, 0, 0.4)`,
  },
  hoverContainer: {
    position: 'fixed' as 'fixed',
    borderRadius: '30vh',
  },
}

const ControlPanel = () => {
  const { state, actions } = useGlobalContext()
  const [mobile, setMobile] = useState(false)

  const handleResize = useCallback(() => {
    setMobile(window.innerWidth < window.innerHeight)
  }, [])

  useEffect(() => {
    setMobile(window.innerWidth < window.innerHeight)
    window.addEventListener('resize', handleResize, false)

    const timeId = setTimeout(() => {
      actions('showCtrlPanel', false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const desktopLayout = {
    height: '9vh',
    width: '40vw',
    flexDirection: 'row' as 'row',
    left: '30vw',
    top: state.showCtrlPanel ? '90vh' : '100vh',
    transition: 'top 0.2s ease-in-out',
  }

  const mobileLayout = {
    height: '40vh',
    width: '9vh',
    flexDirection: 'column' as 'column',
    top: '30vh',
    left: state.showCtrlPanel ? 'calc(100vw - 10vh)' : '100vw',
    transition: 'left 0.2s ease-in-out',
  }

  const desktopHover = {
    height: '30vh',
    width: '60vw',
    left: '-5vw',
  }

  const mobileHover = {
    height: '60vh',
    width: '30vw',
    top: '-5vh',
  }

  const openCtrlPanel = () => {
    actions('showCtrlPanel', true)
  }

  const closeCtrlPanel = () => {
    actions('showCtrlPanel', false)
  }

  const add = (num: number) => {
    actions('pedestriansToAdd', num)
  }

  return (
    <div
      style={{
        ...sx.ctrlPanel,
        ...(mobile ? mobileLayout : desktopLayout),
      }}
      onMouseEnter={openCtrlPanel}
      onMouseLeave={closeCtrlPanel}
    >
      <div
        style={{
          ...sx.hoverContainer,
          ...(mobile ? mobileHover : desktopHover),
        }}
        onMouseDown={openCtrlPanel}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      ></div>
      <Button
        style={state.pause ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="pause"
        onClick={() => actions('pause')}
        icon="pause.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={state.clear ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="clear"
        onClick={() => actions('clear', true)}
        icon="clear.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={
          state.pedestriansToAdd == 1 ? { ...sx.btn, ...sx.btnActive } : sx.btn
        }
        text=""
        value="1"
        onClick={() => add(1)}
        icon="plus-one.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={
          state.pedestriansToAdd == 10 ? { ...sx.btn, ...sx.btnActive } : sx.btn
        }
        text=""
        value="10"
        onClick={() => add(10)}
        icon="plus-ten.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={
          state.pedestriansToAdd == 100
            ? { ...sx.btn, ...sx.btnActive }
            : sx.btn
        }
        text=""
        value="100"
        onClick={() => add(100)}
        icon="plus-100.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={sx.btn}
        text=""
        value="decreasespeed"
        onClick={() => actions('playbackSpeed', -0.1)}
        icon="decrease-speed.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={sx.btn}
        text=""
        value="increasespeed"
        onClick={() => actions('playbackSpeed', 0.1)}
        icon="increase-speed.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={state.showDestination ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="destination"
        onClick={() => actions('showDestination')}
        icon="flag.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={
          state.showProtectedRange ? { ...sx.btn, ...sx.btnActive } : sx.btn
        }
        text=""
        value="protectedRange"
        onClick={() => actions('showProtectedRange')}
        icon="radar.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={state.showVelocity ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="velocity"
        onClick={() => actions('showVelocity')}
        icon="arrow.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
    </div>
  )
}

export default memo(ControlPanel)
