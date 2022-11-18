import { createContext, FC } from 'react'
import { GlobalContextType, GlobalProps } from '../types'

export const GlobalContext = createContext<GlobalContextType>({
  state: {},
  actions: () => {},
})

const GlobalContextProvider: FC<GlobalProps> = (props: GlobalProps) => {
  return (
    <GlobalContext.Provider value={props.value}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
