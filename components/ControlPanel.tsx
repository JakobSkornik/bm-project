import Button from './Button'

import { memo, useEffect, useState } from 'react'
import { useControlPanelContext } from '../context'

const sx = {
  ctrlPanel: {
    position: 'fixed' as 'fixed',
    left: 'calc(50vw - 80px)',
    height: '80px',
    width: '160px',
    padding: '10px',
    backgroundColor: 'darkgray',
    backdropFilter: 'blur(3px)',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'top 0.2s ease-out',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px darkgray`,
  },
  btn: {
    width: '65px',
    height: '60px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: '40%',
  },
  btnActive: {
    width: '65px',
    height: '60px',
    backgroundColor: 'rgba(100, 100, 100, .4)',
    borderColor: 'rgba(0, 0, 0, 0)',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px darkgray`,
  },
  hoverContainer: {
    position: 'absolute' as 'absolute',
    left: '-75px',
    height: '200px',
    width: '500px',
    borderRadius: '30%',
    top: '-80px',
    zIndex: '-1',
  },
}

const ControlPanel = () => {
  const {
    showControlPanel,
    showDestination,
    showNeighbourhood,
    toggleShowControlPanel,
    toggleShowDestination,
    toggleShowNeighbourhood,
  } = useControlPanelContext()

  useEffect(() => {
    const timeId = setTimeout(() => {
      toggleShowControlPanel(false)
    }, 2000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  const onToggleDestination = () => {
    toggleShowDestination()
  }

  const onToggleNeighbourhood = () => {
    toggleShowNeighbourhood()
  }

  const openCtrlPanel = () => {
    toggleShowControlPanel(true)
  }

  const closeCtrlPanel = () => {
    toggleShowControlPanel(false)
  }

  return (
    <div
      style={{
        ...sx.ctrlPanel,
        ...{
          top: showControlPanel ? 'calc(100vh - 90px)' : 'calc(100vh - 4px)',
        },
      }}
      onMouseEnter={openCtrlPanel}
      onMouseLeave={closeCtrlPanel}
    >
      <div
        style={sx.hoverContainer}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      ></div>
      <Button
        style={showDestination ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="destination"
        onClick={onToggleDestination}
        icon="flag.svg"
        iconSize={50}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={showNeighbourhood ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="neighbourhood"
        onClick={onToggleNeighbourhood}
        icon="radar.svg"
        iconSize={50}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
    </div>
  )
}

export default memo(ControlPanel)
