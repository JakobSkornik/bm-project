import Button from './Button'

import { memo, MouseEvent, useEffect, useState } from 'react'
import { useControlPanelContext } from '../context'

const sx = {
  ctrlPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed' as 'fixed',
    alignItems: 'center',
    backgroundColor: 'darkgray',
    backdropFilter: 'blur(3px)',
    borderRadius: '20px',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 iconSizepx 10px darkgray`,
  },
  btn: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: '40%',
    transition: 'all 0.1s ease-in-out',
  },
  btnActive: {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(100, 100, 100, .4)',
    borderColor: 'rgba(0, 0, 0, 0)',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.5), 0 0 4px 4px rgba(0, 0, 0, 0.4)`,
  },
  hoverContainer: {
    position: 'absolute' as 'absolute',
    borderRadius: '30%',
    zIndex: '-1',
  },
}

const ControlPanel = () => {
  const {
    addNumber,
    clear,
    setAddNumber,
    showControlPanel,
    showDestination,
    showNeighbourhood,
    onClear,
    toggleShowControlPanel,
    toggleShowDestination,
    toggleShowNeighbourhood,
  } = useControlPanelContext()
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setMobile(window.innerWidth < window.innerHeight)

    const timeId = setTimeout(() => {
      toggleShowControlPanel(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const add = (e: MouseEvent<HTMLButtonElement>) => {
    setAddNumber(+e.currentTarget.value)
  }

  const ctrlPanelWidth = 400
  const ctrlPanelHeight = 80
  const iconSize = 40

  const desktopLayout = {
    height: ctrlPanelHeight + 'px',
    width: ctrlPanelWidth + 'px',
    flexDirection: 'row' as 'row',
    left: `calc(50vw - 200px)`,
    top: showControlPanel ? 'calc(100vh - 90px)' : '100vh',
    transition: 'top 0.2s ease-in-out',
  }

  const mobileLayout = {
    height: ctrlPanelWidth + 'px',
    width: ctrlPanelHeight + 'px',
    flexDirection: 'column' as 'column',
    top: `calc(50vh - ${ctrlPanelWidth / 2}px)`,
    left: showControlPanel ? 'calc(100vw - 90px)' : '100vw',
    transition: 'left 0.2s ease-in-out',
  }

  const desktopHover = {
    height: `${ctrlPanelHeight + 100}px`,
    width: `${ctrlPanelWidth + 100}px`,
    left: `-${100 / 2}px`,
  }

  const mobileHover = {
    top: `-${ctrlPanelHeight / 2}px`,
    height: `${ctrlPanelWidth + 100}px`,
    width: `${ctrlPanelHeight + 100}px`,
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
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      ></div>
      <Button
        style={clear ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="clear"
        onClick={onClear}
        icon="clear.svg"
        iconSize={clear ? iconSize - 5 : iconSize}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={addNumber == 1 ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="1"
        onClick={add}
        icon="plus-one.svg"
        iconSize={iconSize}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={addNumber == 10 ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="10"
        onClick={add}
        icon="plus-ten.svg"
        iconSize={iconSize}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={addNumber == 100 ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="100"
        onClick={add}
        icon="plus-100.svg"
        iconSize={iconSize}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={showDestination ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="destination"
        onClick={onToggleDestination}
        icon="flag.svg"
        iconSize={iconSize}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
      <Button
        style={showNeighbourhood ? { ...sx.btn, ...sx.btnActive } : sx.btn}
        text=""
        value="neighbourhood"
        onClick={onToggleNeighbourhood}
        icon="radar.svg"
        iconSize={iconSize}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      />
    </div>
  )
}

export default memo(ControlPanel)
