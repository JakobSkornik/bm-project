import { memo, MouseEvent, useCallback, useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import Button from './Button'
import ControlPanelSlider from './ControlPanelSlider'

const sx = {
  ctrlPanel: {
    position: 'fixed' as 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    display: 'inline-table',
    width: 'min(6vh, 6vw)',
    height: 'min(6vh, 6vw)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: '40%',
    transition: 'all 0.1s ease-in-out',
  },
  btnActive: {
    width: 'min(5vh, 5vw)',
    height: 'min(5vh, 5vw)',
    backgroundColor: 'rgba(100, 100, 100, .4)',
    borderColor: 'rgba(0, 0, 0, 0)',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.5), 0 0 4px 4px rgba(0, 0, 0, 0.4)`,
  },
  horizontalHover: {
    position: 'fixed' as 'fixed',
    height: '30vh',
    width: '100vw',
    left: '0vw',
  },
  verticalHover: {
    position: 'fixed' as 'fixed',
    height: '100vh',
    width: '30vw',
  },
  btnContainer: {
    padding: 'min(2vh, 2vw)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgray',
    backdropFilter: 'blur(3px)',
    borderRadius: '30vh',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.2), 0 0 40px 10px darkgray`,
  },
}

const ControlPanel = () => {
  const { state, actions } = useGlobalContext()
  const [vertical, setVertical] = useState<boolean>(false)
  const [popup, setPopup] = useState<string>('')

  const handleResize = useCallback(() => {
    setVertical(window.innerWidth < window.innerHeight)
  }, [])

  useEffect(() => {
    setVertical(window.innerWidth < window.innerHeight)
    window.addEventListener('resize', handleResize, false)

    const timeId = setTimeout(() => {
      actions('showCtrlPanel', false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [handleResize, actions])

  const horizontalLayout = {
    height: '9vh',
    top: state.showCtrlPanel ? '90vh' : '100vh',
    transition: 'top 0.2s ease-in-out',
  }

  const verticalLayout = {
    height: '40vh',
    width: '9vw',
    top: '30vh',
    left: state.showCtrlPanel ? 'calc(100vw - 10vh)' : '100vw',
    transition: 'left 0.2s ease-in-out',
  }

  const horizontalBtnContainer = {
    height: '9vh',
    flexDirection: 'row' as 'row',
  }

  const verticalBtnContainer = {
    width: '9vw',
    flexDirection: 'column' as 'column',
  }

  const openCtrlPanel = () => {
    actions('showCtrlPanel', true)
  }

  const togglePopup = (popupName: string) => {
    if (popupName == popup) {
      actions('showCtrlPanel', true)
      setPopup('')
      return
    }

    actions('showCtrlPanel', true)
    setPopup(popupName)
  }

  const closeCtrlPanel = () => {
    actions('showCtrlPanel', false)
  }

  const click = (name: string, which: number, val?: any) => {
    if (which == 0) {
      actions(name, val)
    } else if (which == 2) {
      togglePopup(name)
    }
  }

  return (
    <div
      style={{
        ...sx.ctrlPanel,
        ...(vertical ? verticalLayout : horizontalLayout),
      }}
    >
      <div
        style={vertical ? sx.verticalHover : sx.horizontalHover}
        onMouseDown={openCtrlPanel}
        onMouseEnter={openCtrlPanel}
        onMouseLeave={closeCtrlPanel}
      ></div>
      <div
        style={{
          ...sx.btnContainer,
          ...(vertical ? verticalBtnContainer : horizontalBtnContainer),
        }}
        onMouseEnter={openCtrlPanel}
      >
        <Button
          style={state.pause ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="pause"
          onClick={() => actions('pause')}
          icon="pause.svg"
          onMouseEnter={openCtrlPanel}
        />
        <Button
          style={state.clear ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="clear"
          onClick={() => actions('clear', true)}
          icon="clear.svg"
          onMouseEnter={openCtrlPanel}
        />
        <Button
          style={
            state.showDestination ? { ...sx.btn, ...sx.btnActive } : sx.btn
          }
          text=""
          value="destination"
          onClick={() => actions('showDestination')}
          icon="flag.svg"
          onMouseEnter={openCtrlPanel}
        />
        <Button
          style={state.showVelocity ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="velocity"
          onClick={() => actions('showVelocity')}
          icon="arrow.svg"
          onMouseEnter={openCtrlPanel}
        />
        <Button
          style={state.bounds ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="bounds"
          onClick={() => actions('bounds')}
          icon="bounds.svg"
          onMouseEnter={openCtrlPanel}
        />
        <Button
          style={
            popup == 'pedestriansToAdd'
              ? { ...sx.btn, ...sx.btnActive }
              : sx.btn
          }
          text=""
          value="addPedestrians"
          onClick={() => togglePopup('pedestriansToAdd')}
          icon="plus.svg"
          onMouseEnter={openCtrlPanel}
        >
          {popup == 'pedestriansToAdd' && (
            <ControlPanelSlider
              min={1}
              max={100}
              step={1}
              default={state.pedestriansToAdd}
              stateVar={'pedestriansToAdd'}
              vertical={vertical}
              onMouseEnter={openCtrlPanel}
              onMouseLeave={() => togglePopup('pedestriansToAdd')}
            />
          )}
        </Button>
        <Button
          style={
            popup == 'playbackSpeed' ? { ...sx.btn, ...sx.btnActive } : sx.btn
          }
          text=""
          value="playbackSpeed"
          onClick={() => togglePopup('playbackSpeed')}
          icon="play.svg"
          onMouseEnter={openCtrlPanel}
        >
          {popup == 'playbackSpeed' && (
            <ControlPanelSlider
              min={0.1}
              max={10.0}
              step={0.1}
              default={state.playbackSpeed}
              stateVar={'playbackSpeed'}
              vertical={vertical}
              onMouseEnter={openCtrlPanel}
              onMouseLeave={() => togglePopup('playbackSpeed')}
            />
          )}
        </Button>
        <Button
          style={
            state.showPreferredRange ? { ...sx.btn, ...sx.btnActive } : sx.btn
          }
          text=""
          value="showPreferredRange"
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            click('showPreferredRange', e.button)
          }
          icon="vision.svg"
          onMouseEnter={openCtrlPanel}
        >
          {popup == 'showPreferredRange' && (
            <ControlPanelSlider
              min={10}
              max={300}
              step={1}
              default={state.preferredRange}
              stateVar={'preferredRange'}
              vertical={vertical}
              onMouseEnter={openCtrlPanel}
              onMouseLeave={() => togglePopup('showPreferredRange')}
            />
          )}
        </Button>
        <Button
          style={
            state.showProtectedRange ? { ...sx.btn, ...sx.btnActive } : sx.btn
          }
          text=""
          value="showProtectedRange"
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            click('showProtectedRange', e.button)
          }
          icon="radar.svg"
          onMouseEnter={openCtrlPanel}
        >
          {popup == 'showProtectedRange' && (
            <ControlPanelSlider
              min={10}
              max={200}
              step={1}
              default={state.protectedRange}
              stateVar={'protectedRange'}
              vertical={vertical}
              onMouseEnter={openCtrlPanel}
              onMouseLeave={() => togglePopup('showProtectedRange')}
            />
          )}
        </Button>
        <Button
          style={state.alignment ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="align"
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            click('alignment', e.button)
          }
          icon="alignment.svg"
          onMouseEnter={openCtrlPanel}
        >
          {popup == 'alignment' && (
            <ControlPanelSlider
              min={0}
              max={0.99}
              step={0.01}
              default={state.alignmentFactor}
              stateVar={'alignmentFactor'}
              vertical={vertical}
              onMouseEnter={openCtrlPanel}
              onMouseLeave={() => togglePopup('alignment')}
            />
          )}
        </Button>
        <Button
          style={state.cohesion ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="cohesion"
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            click('cohesion', e.button)
          }
          icon="cohesion.svg"
          onMouseEnter={openCtrlPanel}
        >
          {popup == 'cohesion' && (
            <ControlPanelSlider
              min={0}
              max={0.0099}
              step={0.0001}
              default={state.cohesionFactor}
              stateVar={'cohesionFactor'}
              vertical={vertical}
              onMouseEnter={openCtrlPanel}
              onMouseLeave={() => togglePopup('cohesion')}
            />
          )}
        </Button>
        <Button
          style={state.separation ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="separation"
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            click('separation', e.button)
          }
          icon="separation.svg"
          onMouseEnter={openCtrlPanel}
        >
          {popup == 'separation' && (
            <ControlPanelSlider
              min={0}
              max={0.99}
              step={0.01}
              default={state.separationFactor}
              stateVar={'separationFactor'}
              vertical={vertical}
              onMouseEnter={openCtrlPanel}
              onMouseLeave={() => togglePopup('separation')}
            />
          )}
        </Button>
        <Button
          style={state.bias ? { ...sx.btn, ...sx.btnActive } : sx.btn}
          text=""
          value="bias"
          onClick={(e: MouseEvent<HTMLButtonElement>) =>
            click('bias', e.button)
          }
          icon="bias.svg"
          onMouseEnter={openCtrlPanel}
        >
          {popup == 'bias' && (
            <ControlPanelSlider
              min={0}
              max={0.099}
              step={0.001}
              default={state.biasFactor}
              stateVar={'biasFactor'}
              vertical={vertical}
              onMouseEnter={openCtrlPanel}
              onMouseLeave={() => togglePopup('bias')}
            />
          )}
        </Button>
      </div>
    </div>
  )
}

export default memo(ControlPanel)
