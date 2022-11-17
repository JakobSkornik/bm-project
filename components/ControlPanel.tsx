import { memo, MouseEvent, useEffect, useState } from 'react'

import Button from './Button'
import useStore from '../store'

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
    width: '5vh',
    height: '5vh',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: '40%',
    transition: 'all 0.1s ease-in-out',
  },
  btnActive: {
    width: '5vh',
    height: '5vh',
    backgroundColor: 'rgba(100, 100, 100, .4)',
    borderColor: 'rgba(0, 0, 0, 0)',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.5), 0 0 4px 4px rgba(0, 0, 0, 0.4)`,
  },
  hoverContainer: {
    position: 'fixed' as 'fixed',
    borderRadius: '30vh',
    zIndex: '-1',
  },
}

const ControlPanel = () => {
  const [state, actions] = useStore()
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(window.innerWidth < window.innerHeight)

    const timeId = setTimeout(() => {
      actions.setShowCtrlPanel(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openCtrlPanel = () => {
    actions.setShowCtrlPanel(true)
  }

  const closeCtrlPanel = () => {
    actions.setShowCtrlPanel(false)
  }

  const add = (e: MouseEvent<HTMLButtonElement>) => {
    actions.setPedestriansToAdd(+e.currentTarget.value)
  }

  const desktopLayout = {
    height: '9vh',
    width: '50vw',
    flexDirection: 'row' as 'row',
    left: '25vw',
    top: state.showCtrlPanel ? '90vh' : '100vh',
    transition: 'top 0.2s ease-in-out',
  }

  const mobileLayout = {
    height: '50vh',
    width: '9vw',
    flexDirection: 'column' as 'column',
    top: '25vh',
    left: state.showCtrlPanel ? '90vw' : '100vw',
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
        onClick={actions.togglePause}
        icon="pause.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={state.clear ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="clear"
        onClick={() => actions.setClear(true)}
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
        onClick={add}
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
        onClick={add}
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
        onClick={add}
        icon="plus-100.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={state.showDestination ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="destination"
        onClick={actions.toggleShowDestination}
        icon="flag.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={
          state.showNeighbourhood ? { ...sx.btn, ...sx.btnActive } : sx.btn
        }
        text=""
        value="neighbourhood"
        onClick={actions.toggleShowNeighbourhood}
        icon="radar.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={state.showVelocity ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="velocity"
        onClick={actions.toggleShowVelocity}
        icon="arrow.svg"
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
    </div>
  )
}

export default memo(ControlPanel)
