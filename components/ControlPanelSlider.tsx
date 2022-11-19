import { memo, MouseEvent, useState } from 'react'
import { Range } from 'react-range'
import { useGlobalContext } from '../context'

import { ControlPanelSliderProps } from '../types/ControlPanelSliderProps'

const sx = {
  container: {
    position: 'absolute' as 'absolute',
    background: '#CF909050',
    padding: 'min(2vh, 2vw)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 'min(3vh, 3vw)',
    backgroundColor: 'rgba(100, 100, 100, .6)',
    borderColor: 'rgba(0, 0, 0, 0)',
    boxShadow: `0 0 30px 1px rgba(200, 200, 200, 0.5), 0 0 4px 4px rgba(0, 0, 0, 0.4)`,
  },
  text: {
    fontSize: 'min(2vh, 2vw)',
    fontWeight: '800',
    fontFamily: 'Mono',
    color: 'black',
  },
  track: {
    height: '1vh',
    width: '80%',
    backgroundColor: '#ccc',
  },
  thumb: {
    height: 'min(4vh, 4vw)',
    width: 'min(4vh, 4vw)',
    backgroundColor: '#666666D0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontFamily: 'Mono',
    fontSize: 'min(2vh, 2vw)',
    fontWeight: '700',
    color: 'black',
  },
  title: {
    position: 'absolute' as 'absolute',
    fontFamily: 'Mono',
    fontSize: 'min(2vh, 2vw)',
    fontWeight: '700',
    color: 'black',
    top: '0',
    width: '100%',
    justifyContent: 'left',
  },
}

type Dict = {
  [key: string]: string
}

enum Direction {
  Right = 'to right',
  Left = 'to left',
  Down = 'to bottom',
  Up = 'to top',
}

const stateDict: Dict = {
  '': '',
  preferredRange: 'Set Visual Range',
  protectedRange: 'Set Separation Range',
  pedestriansToAdd: 'Set Add Number',
  playbackSpeed: 'Set Playback Speed',
  alignmentFactor: 'Set Alignment Factor',
  cohesionFactor: 'Set Cohesion Factor',
  separationFactor: 'Set Separation Factor',
  biasFactor: 'Set Bias Factor',
}

const ControlPanelSlider = (sliderProps: ControlPanelSliderProps) => {
  const { state, actions } = useGlobalContext()
  const [values, setValue] = useState([state[sliderProps.stateVar]])

  const changeVal = (val: number[]) => {
    setValue(val)
    actions(sliderProps.stateVar, val[0])
  }

  const horizontalLayout = {
    width: '30vw',
    height: '10vh',
    bottom: '5vh',
    left: '-15vw',
    flexDirection: 'row' as 'row',
  }

  const verticalLayout = {
    width: '10vw',
    height: '40vh',
    bottom: '-15vh',
    left: '-10vw',
    flexDirection: 'column' as 'column',
  }

  const horizontalTrack = {
    height: '1vh',
    width: '80%',
    backgroundColor: '#ccc',
  }

  const verticalTrack = {
    width: '1vw',
    height: '80%',
    backgroundColor: '#ccc',
  }

  return (
    <div
      style={{
        ...sx.container,
        ...(sliderProps.vertical ? verticalLayout : horizontalLayout),
      }}
      onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
      }}
      onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
        if (sliderProps.onMouseLeave) sliderProps.onMouseLeave(e)
      }}
    >
      <div style={sx.title}>
        {sliderProps.vertical ? '' : stateDict[sliderProps.stateVar]}
      </div>
      <span style={sx.text}>
        {sliderProps.vertical ? sliderProps.max : sliderProps.min}
      </span>
      <Range
        step={sliderProps.step}
        min={sliderProps.min}
        max={sliderProps.max}
        values={values}
        direction={sliderProps.vertical ? Direction.Up : Direction.Right}
        onChange={(v) => changeVal(v)}
        renderTrack={({ props, children }) => (
          <div
            onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
              if (sliderProps.onMouseEnter) sliderProps.onMouseEnter(e)
            }}
            {...props}
            style={{
              ...props.style,
              ...(sliderProps.vertical ? verticalTrack : horizontalTrack),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
              if (sliderProps.onMouseEnter) sliderProps.onMouseEnter(e)
            }}
            {...props}
            style={{ ...props.style, ...sx.thumb }}
          >
            <span style={sx.value}>{values[0]}</span>
          </div>
        )}
      />
      <span style={sx.text}>
        {sliderProps.vertical ? sliderProps.min : sliderProps.max}
      </span>
    </div>
  )
}

export default memo(ControlPanelSlider)
